const express = require('express');
const https = require('https');
const axios = require('axios');
const path = require('path');
fs = require('fs');

const router = express.Router();
require('dotenv').config();

//=================================
//             Offers
//=================================

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

// current implementation only gets all offers with no filter
//?max=int
router.get('/list', async (req, res) => {
  let max = req.query.max;
  config.url = process.env.VMORC_GET_ALL_URL;
  config.params = { max_offers: parseInt(max) };
  axios(config)
    .then(function (response) {
      var data = response.data;
      return res.json(minimizeAndReturnOfferResponse(data));
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
