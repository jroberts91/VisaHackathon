const express = require('express');
const router = express.Router();
// const { Merchant } = require("../models/Merchant");
// const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");
const { Order } = require("../models/Order");
const { PullFundsTransaction, PushFundsTransaction } = require("../external/visaDirect");

//=================================
//             Payment
//=================================

router.post("/direct", async (req, res) => {
    // validate order info and create payment 
    var orderBody = req.body.order;
    var paymentBody = req.body.payment;

    let merchantId = orderBody.merchantId;
    // const merchant = await Merchant.findOne({"_id": merchantId })
    // if (!merchant) return res.status(400).json({success: false})

    let productId = orderBody.product;
    // const product = await Product.findOne({"_id": productId})
    // if (!product) return res.status(400).json({success: false})

    // check product belong to merchant
    if (product.merchantId != merchantId ) {
        console.err("merchantId does not match under product");
        return res.status(400).json({success: false});
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
        await payment.save(async function(err, payment) {
            order.paymentId = payment._id;
            order.isFulfilled = false;
            await order.save();
         });
        // TODO fix throw error
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false, err})
    }

    res.status(200).json({success:true})
});

module.exports = router;