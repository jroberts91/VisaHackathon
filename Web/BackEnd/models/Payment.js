const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  address: String,
  phoneNumber: String,
  firstName: String,
  lastName: String,
  dateTime: Date,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
