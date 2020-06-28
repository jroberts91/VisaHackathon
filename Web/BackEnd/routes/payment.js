const express = require('express');
const router = express.Router();
const { Merchant } = require('../models/Merchant');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');
const { Order } = require('../models/Order');
const { PullFundsTransaction, PushFundsTransaction } = require('../external/visaDirect');
const { SendPaymentEmail } = require('../external/smtpService');

//=================================
//             Payment
//=================================

router.post("/direct", async (req, res) => {
    // validate order info and create payment 
    var orderBody = req.body.order;
    var paymentBody = req.body.payment;

    let merchantId = orderBody.merchantId;
    const merchant = await Merchant.findOne({"_id": merchantId })
    if (!merchant) return res.json({success: false})

    let productId = orderBody.product;
    const product = await Product.findOne({"_id": productId})
    if (!product) return res.json({success: false})

    // check product belong to merchant
    if (product.merchantId != merchantId ) {
        console.log("merchantId does not match under product");
        return res.json({success: false});
    }
    if (orderBody.quantity < 0) {
        console.log("product qty cannot be zero");
        return res.json({success: false});
    }
    // check if there is qty available
    let newSoldQty = parseInt(orderBody.quantity) + product.soldQty;
    if (newSoldQty > product.totalQty) {
        console.log("product not available");
        return res.json({success: false});
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
        return res.json({success: false, err})
    }

    // update product qty
    await Product.findOneAndUpdate({ _id: productId }, { soldQty: newSoldQty });

    await payment.save(async function(err, payment) {
        if (err) return res.json({ success: false, err })
        order.payment = payment;
        order.isFulfilled = false;
        await order.save(async function(err, order) {
            if (err) return res.json({ success: false, err })
            await SendPaymentEmail(order.email, order._id, merchant.name, merchant.email);
            return res.json({success: true, orderId: order._id, paymentId: order.payment._id})
        });
    });
});

module.exports = router;
