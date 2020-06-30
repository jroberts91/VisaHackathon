const express = require('express');
const https = require('https');
const axios = require('axios');
const path = require('path');
const { Offer } = require('../models/Offer');
const { Merchant } = require('../models/Merchant');
const { ESRCH } = require('constants');

fs = require('fs');

const router = express.Router();
require('dotenv').config();

var config = {
  method: 'get',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer(process.env.VD_USERNAME + ':' + process.env.VD_PASSWORD).toString('base64'),
  },
  httpsAgent: new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, '../resources/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../resources/key.pem')),
  }),
};

//=================================
//             Offers
//=================================

router.post('/add', async (req, res) => {
  let merchantId = req.body.merchantId;
  const merchant = await Merchant.findOne({ _id: merchantId });
  if (!merchant) return res.json({ success: false, msg: 'merchant not found' });
  const offer = new Offer(req.body);
  offer.merchantName = merchant.name;
  offer.quantityUsed = 0;
  offer.unique = req.body.code + merchantId;
  //save to mongoDB
  try {
    await offer.save();
    res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, err: err });
  }
});

router.get('/visell/list', async (req, res) => {
  Offer.find().exec((err, offers) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, offers, postSize: offers.length });
  });
});

//?merchantId=${merchantId}
router.get('/visell/getByMerchant', async (req, res) => {
  let merchantId = req.query.merchantId;
  Offer.find({ merchantId: merchantId }).exec((err, offers) => {
    if (err) return res.json({ success: false, err });
    res.json({ success: true, offers, postSize: offers.length });
  });
});

//?merchantId=${merchantId}
//?code=${code}
router.get('/visell/redeem', async (req, res) => {
  let merchantId = req.query.merchantId;
  let code = req.query.code;
  Offer.find({ merchantId: merchantId, code: code }).exec((err, offers) => {
    if (err) return res.json({ success: false, err });
    if (!offers.length) return res.json({ success: false, msg: 'not found' });
    res.json({ success: true });
  });
});

// current implementation only gets all offers with no filter
//?max=int
router.get('/list', async (req, res) => {
  let max = req.query.max;
  config.url = process.env.VMORC_GET_ALL_URL;
  config.params = { max_offers: parseInt(max) };
  axios(config)
    .then(function (response) {
      var data = response.data;
      // return res.json(minimizeAndReturnOfferResponse(data));
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.json({ success: false, err });
    });
});

/**
 * Map offer to required offer paramters.
 * @param {vmorc resp} data
 */
function minimizeAndReturnOfferResponse(data) {
  let response = {
    success: true,
    ReturnedResults: data.ReturnedResults,
    TotalFoundResults: data.TotalFoundResults,
    Offers: [],
  };
  var offers = data.Offers;
  for (var i in offers) {
    var merchantImages = offers[i].merchantList[0].merchantImages;
    for (var j in merchantImages) {
      delete merchantImages[j].languageIds;
      delete merchantImages[j].languages;
    }
    response.Offers.push({
      programName: offers[i].programName,
      programId: offers[i].programId,
      merchantName: offers[i].merchantList[0].merchant,
      merchantId: offers[i].merchantList[0].merchantId,
      merchantImages: offers[i].merchantList[0].merchantImages,
      soldOut: offers[i].soldOut,
      offerTitle: offers[i].offerTitle,
      validityFromDateTime: offers[i].validityFromDateTime,
      validityToDateTime: offers[i].validityToDateTime,
      promotionFromDateTime: offers[i].promotionFromDateTime,
      promotionToDateTime: offers[i].promotionToDateTime,
      imageList: offers[i].imageList,
      redemptionUrl: offers[i].redemptionUrl,
      redemptionEmail: offers[i].redemptionEmail,
      redemptionCode: offers[i].redemptionCode,
    });
  }
  return response;
}

module.exports = router;
