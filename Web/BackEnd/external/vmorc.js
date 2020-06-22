const https = require('https');
const axios = require('axios');
const path = require("path");
fs = require('fs');

require('dotenv').config();

var config = {
    method: 'get',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': "Basic " + new Buffer(process.env.VD_USERNAME + ":" + process.env.VD_PASSWORD).toString("base64")
    },
    httpsAgent: new https.Agent({
        cert: fs.readFileSync(path.resolve(__dirname, "../resources/cert.pem")),
        key: fs.readFileSync(path.resolve(__dirname, "../resources/key.pem")),
    })
};

let RetrieveAllOffers = (max) => {
    // hard coded for now
    config.url = process.env.VMORC_GET_ALL_URL;
    config.params = {max_offers: max};
    axios(config).then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;
    }).catch(function (error) {
        console.log(error);
        throw new Error("visa direct pull funds API error");
    });
}

module.exports = { RetrieveAllOffers }