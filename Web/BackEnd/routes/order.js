const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const { auth } = require('../middleware/auth');

//=================================
//            Order
//=================================

router.post('/fulfill', auth, async (req, res) => {
  let orderId = req.body.orderId;
  const order = await Order.findOne({ _id: orderId });
  order.isFulfilled = true;
  order.dateTimeFulfilled = Date.now();
  order.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.get('/getAll', auth, (req, res) => {
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
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, orders, postSize: orders.length });
      });
  } else {
    Order.find(findArgs)
      .lean()
      .sort([[sortBy, order]])
      .exec((err, orders) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, orders, postSize: orders.length });
      });
  }
});

//?id=${orderId}
router.get('/get', auth, async (req, res) => {
  let orderId = req.query.orderId;
  const order = await Order.findOne({ _id: orderId });
  if (!order) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, order: order });
});

module.exports = router;
