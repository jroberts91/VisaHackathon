const express = require('express');
const https = require('https');
const axios = require('axios');
const path = require('path');
fs = require('fs');

const router = express.Router();
require('dotenv').config();

//=================================
//        merchantLocator
//=================================

var config = {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer(process.env.VD_USERNAME + ':' + process.env.VD_PASSWORD).toString('base64'),
  },
  httpsAgent: new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, '../resources/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../resources/key.pem')),
  }),
  data: {
    header: {
      requestMessageId: 'Request Merchant Locator',
      messageDateTime: new Date().toISOString().replace(/Z/, ''),
    },
    responseAttrList: ['GNLOCATOR'],
    searchOptions: {
      maxRecords: '100',
      matchIndicators: 'true',
      matchScore: 'true',
    },
    searchAttrList: {
      merchantName: 'Starbucks',
      merchantCountryCode: '840',
      latitude: '37.363922',
      longitude: '-121.929163',
      distance: '100',
      distanceUnit: 'KM',
    },
  },
};

router.post('/getAll', (req, res) => {
  config.url = 'https://sandbox.api.visa.com/merchantlocator/v1/locator';
  config.data.searchAttrList.merchantName = req.body.name;
  config.data.searchAttrList.latitude = req.body.lat;
  config.data.searchAttrList.longitude = req.body.lng;
  axios(config)
    .then(function (response) {
      var data = response.data;
      data.success = true;
      return res.status(200).json({ success: true, data });
    })
    .catch(function (error) {
      console.log(error);
      return res.status(400).send({ success: false });
    });
});

module.exports = router;
