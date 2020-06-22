const mongoose = require('mongoose');
const { Product } = require('../models/Product');

const orderSchema = mongoose.Schema({
  paymentId: String,
  merchantId: String,
  product: Product.schema,
  quantity: Number,
  isFulfilled: Boolean,
  dateTimeFulfilled: Date,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
