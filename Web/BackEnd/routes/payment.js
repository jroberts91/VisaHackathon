const express = require('express');
const router = express.Router();
const { Merchant } = require('../models/Merchant');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { Order } = require('../models/Order');
const { Offer } = require('../models/Offer');
const { Transaction } = require('../models/Transaction');
const { PullFundsTransaction, PushFundsTransaction, ReverseFundsTransaction } = require('../external/visaDirect');
const { SendPaymentEmail } = require('../external/smtpService');

//=================================
//             Payment
//=================================

router.post('/refund', async (req, res) => {
  let orderId = req.body.orderId;
  const order = await Order.findOne({ _id: orderId });
  if (!order) return res.json({ success: false, msg: 'order not found' });
  var payment = order.payment;
  try {
    await ReverseFundsTransaction(payment);
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }
  order.isRefunded = true;
  order.dateTimeRefunded = Date.now();
  order.save(async (err) => {
    if (err) return res.json({ success: false, err });
    return res.json({ success: true });
  });
});

router.post('/mobile', async (req, res) => {
  let merchantId = req.body.merchantId;
  const merchant = await Merchant.findOne({ _id: merchantId });
  if (!merchant) return res.json({ success: false, msg: 'merchant not found' });

  var cart = req.body.cart;
  for (var i in cart) {
    let productId = cart[i].productId;
    const product = await Product.findOne({ _id: productId });
    if (!product) return res.json({ success: false, msg: 'product not found' });

    if (cart[i].quantity < 0) {
      console.log('product qty cannot be zero');
      return res.json({ success: false });
    }

    // check product belong to merchant
    if (product.merchantId != merchantId) {
      console.log('merchantId does not match under product');
      return res.json({ success: false });
    }
    // check if there is qty available
    let newSoldQty = parseInt(cart[i].quantity) + product.soldQty;
    if (newSoldQty > product.totalQty) {
      console.log('product not available');
      return res.json({ success: false });
    }

    let paymentJson = {
      firstName: 'Mobile user',
      lastName: 'Mobile user',
      dateTime: Date.now(),
    };
    const payment = new Payment(paymentJson);
    // order is created after payment is saved

    let orderJson = {
      merchantId: product.merchantId,
      product: product,
      isFulfilled: true,
      isRefunded: false,
      dateTimeFulfilled: Date.now(),
      quantity: parseInt(cart[i].quantity),
    };

    const order = new Order(orderJson);

    // when calculate price minus from offer
    try {
      // pull from consumer
      await PullFundsTransaction();
      // push to merchant
      await PushFundsTransaction();
      // save only if succesful
    } catch (err) {
      console.log(err);
      return res.json({ success: false, err });
    }

    // update product qty
    await Product.findOneAndUpdate({ _id: productId }, { soldQty: newSoldQty });

    await payment.save(async function (err, payment) {
      if (err) return res.json({ success: false, err });
      order.payment = payment;
      await order.save(async function (err, order) {
        if (err) return res.json({ success: false, err });
      });
    });
  }
  return res.json({ success: true });
});

router.post('/direct', async (req, res) => {
  // validate order info and create payment
  var orderBody = req.body.order;
  var paymentBody = req.body.payment;

  let merchantId = orderBody.merchantId;
  const merchant = await Merchant.findOne({ _id: merchantId });
  if (!merchant) return res.json({ success: false, msg: 'merchant not found' });

  let code = orderBody.code;
  const offer = await Offer.findOne({ code: code, merchantId: merchantId });
  if (!offer) return res.json({ success: false, msg: 'offer not found' });

  if (offer.quantityUsed >= offer.quantity) {
    return res.json({ success: false, msg: 'offer fully redeemed' });
  }
  let offerNewQuantity = offer.quantityUsed + 1;

  let productId = orderBody.product;
  const product = await Product.findOne({ _id: productId });
  if (!product) return res.json({ success: false, msg: 'product not found' });

  // check product belong to merchant
  if (product.merchantId != merchantId) {
    console.log('merchantId does not match under product');
    return res.json({ success: false });
  }
  if (orderBody.quantity < 0) {
    console.log('product qty cannot be zero');
    return res.json({ success: false });
  }
  // check if there is qty available
  let newSoldQty = parseInt(orderBody.quantity) + product.soldQty;
  if (newSoldQty > product.totalQty) {
    console.log('product not available');
    return res.json({ success: false });
  }

  paymentBody.dateTime = Date.now(); // set date
  const payment = new Payment(paymentBody);
  // order is created after payment is saved
  orderBody.product = product;
  const order = new Order(orderBody);
  try {
    // pull from consumer
    await PullFundsTransaction();
    // push to merchant
    await PushFundsTransaction();
    // save only if succesful
  } catch (err) {
    console.log(err);
    return res.json({ success: false, err });
  }

  // update offer qty
  await Offer.findOneAndUpdate({ _id: offer._id }, { quantityUsed: offerNewQuantity });

  // update product qty
  await Product.findOneAndUpdate({ _id: productId }, { soldQty: newSoldQty });

  await payment.save(async function (err, payment) {
    if (err) return res.json({ success: false, err });
    order.payment = payment;
    order.isFulfilled = false;
    order.isRefunded = false;
    await order.save(async function (err, order) {
      if (err) return res.json({ success: false, err });
      await SendPaymentEmail(order.email, order._id, merchant.name, merchant.email);
      return res.json({ success: true, orderId: order._id, paymentId: order.payment._id });
    });
  });
});

module.exports = router;
