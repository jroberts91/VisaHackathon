const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
  offerName: String,
  code: String,
  merchantId: String,
  merchantName: String,
  description: String,
  offerTitle: String,
  value: Number,
  minValue: Number,
  quantityUsed: Number,
  quantity: Number,
  unique: { type: String, unique: 1 },
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = { Offer };
