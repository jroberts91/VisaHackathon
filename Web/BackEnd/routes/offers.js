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
      data.success = true;
      return res.json(data);
    })
    .catch(function (error) {
      console.log(error);
      return res.json({ success: false, err });
    });
});

module.exports = router;
