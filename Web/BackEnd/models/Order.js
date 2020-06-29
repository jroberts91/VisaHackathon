const mongoose = require('mongoose');
const { Product } = require('../models/Product');
const { Payment } = require('../models/Payment');

const orderSchema = mongoose.Schema({
  merchantId: String,
  address: String,
  payment: Payment.schema,
  product: Product.schema,
  quantity: Number,
  phoneNumber: String,
  email: String,
  isFulfilled: Boolean,
  dateTimeFulfilled: Date,
  isRefunded: Boolean,
  dateTimeRefunded: Date,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
