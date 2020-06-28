const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
  offerId: String,
  programName: String,
  merchantName: String,
  soldOut: Boolean,
  offerTitle: String,
  redemptionUrl: String,
  merchantImage: String,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = { Offer };
