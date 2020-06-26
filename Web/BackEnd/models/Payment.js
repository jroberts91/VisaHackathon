const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    postal: String,
    country: String,
    dateTime : Date
})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
