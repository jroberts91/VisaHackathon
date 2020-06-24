const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const { auth } = require('../middleware/auth');
const { SendFulfillEmail } = require('../external/smtpService');

//=================================
//            Order
//=================================

router.post('/fulfill', auth, async (req, res) => {
  let orderId = req.body.orderId;
  const order = await Order.findOne({ _id: orderId });
  if (!order) return res.json({ success: false });
  order.isFulfilled = true;
  order.dateTimeFulfilled = Date.now();
  order.save(async (err) => {
    if (err) return res.json({ success: false, err });
    await SendFulfillEmail(order.email);
    return res.json({ success: true });
  });
});

router.post('/getAll', auth, (req, res) => {
  let order = req.body.order ? req.body.orderBy : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';

  let findArgs = { merchantId: req.body.merchantId };
  let term = req.body.search;
  if (req.body.fulfilled === 'fulfilled') {
    findArgs['isFulfilled'] = true;
  } else if (req.body.fulfilled === 'unfulfilled') {
    findArgs['isFulfilled'] = false;
  }

  if (term) {
    Order.find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .exec((err, orders) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true, orders, postSize: orders.length });
      });
  } else {
    Order.find(findArgs)
      .lean()
      .sort([[sortBy, order]])
      .exec((err, orders) => {
        if (err) return res.json({ success: false, err });
        res.json({ success: true, orders, postSize: orders.length });
      });
  }
});

//?id=${orderId}
router.get('/get', async (req, res) => {
  let orderId = req.query.orderId;
  const order = await Order.findOne({ _id: orderId });
  if (!order) return res.json({ success: false });
  return res.json({ success: true, order: order });
});

module.exports = router;
