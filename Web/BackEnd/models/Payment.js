const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    address: String,
    phoneNumber: String,
    firstName: String,
    lastName: String,
    email: String,
    postal: String,
    country: String,
    dateTime : Date
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
