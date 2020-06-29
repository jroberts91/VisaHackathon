const https = require('https');
const axios = require('axios');
const path = require('path');
fs = require('fs');

require('dotenv').config();

var config = {
  method: 'post',
  url: 'https://sandbox.api.visa.com/visadirect/fundstransfer/v1/pullfundstransactions',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer(process.env.VD_USERNAME + ':' + process.env.VD_PASSWORD).toString('base64'),
  },
  httpsAgent: new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, '../resources/cert.pem')),
    key: fs.readFileSync(path.resolve(__dirname, '../resources/key.pem')),
  }),
};

let ReverseFundsTransaction = async (payment) => {
  // hardcode return transaction details
  // should get pull transaction, sender details from payment and update payload
  var date = getLocalTime();
  var data = JSON.stringify({
    transactionIdentifier: '381228649430011',
    systemsTraceAuditNumber: '451050',
    acquirerCountryCode: '608',
    acquiringBin: '408999',
    businessApplicationId: 'AA',
    amount: '24.01',
    cardAcceptor: {
      address: { country: 'USA', county: 'San Mateo', state: 'CA', zipCode: '94404' },
      idCode: 'VMT200911026070',
      name: 'Visa Inc. USA-Foster City',
      terminalId: '365539',
    },
    localTransactionDateTime: date,
    originalDataElements: {
      acquiringBin: '408999',
      approvalCode: '20304B',
      systemsTraceAuditNumber: '897825',
      transmissionDateTime: '2020-06-29T06:14:21',
    },
    retrievalReferenceNumber: '330000550000',
    senderCardExpiryDate: '2015-10',
    senderCurrencyCode: 'USD',
    senderPrimaryAccountNumber: '4895100000055127',
  });
  config.url = process.env.VD_REFUND_URL;
  config.data = data;
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      throw new Error('visa direct push funds API error');
    });
};

let PushFundsTransaction = async () => {
  // sender card details and receipent card details are hardcoded
  // receipient will be merchant
  // sender will be customer
  var date = getLocalTime();
  var data = JSON.stringify({
    systemsTraceAuditNumber: '451018',
    retrievalReferenceNumber: '412770451018',
    acquirerCountryCode: '840',
    acquiringBin: '408999',
    amount: '124.05',
    businessApplicationId: 'AA',
    cardAcceptor: {
      address: { country: 'USA', county: 'San Mateo', state: 'CA', zipCode: '94404' },
      idCode: 'CA-IDCode-77765',
      name: 'Visa Inc. USA-Foster City',
      terminalId: 'TID-9999',
    },
    localTransactionDateTime: date,
    recipientName: 'rohan',
    recipientPrimaryAccountNumber: '4957030420210496',
    senderAccountNumber: '4653459515756154',
    senderAddress: '901 Metro Center Blvd',
    senderCity: 'Foster City',
    senderCountryCode: '124',
    senderName: 'Mohammed Qasim',
    senderReference: '',
    senderStateCode: 'CA',
    sourceOfFundsCode: '05',
    transactionCurrencyCode: 'USD',
  });
  config.url = process.env.VD_PUSH_URL;
  config.data = data;
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      throw new Error('visa direct push funds API error');
    });
};

let PullFundsTransaction = async () => {
  // sender card details hardcoded for now
  // sender will be customer
  var date = getLocalTime();
  var data = JSON.stringify({
    systemsTraceAuditNumber: '451001',
    retrievalReferenceNumber: '330000550000',
    acquirerCountryCode: '840',
    acquiringBin: '408999',
    amount: '124.02',
    businessApplicationId: 'AA',
    cardAcceptor: {
      address: { country: 'USA', county: '081', state: 'CA', zipCode: '94404' },
      idCode: 'ABCD1234ABCD123',
      name: 'Visa Inc. USA-Foster City',
      terminalId: 'ABCD1234',
    },
    localTransactionDateTime: date,
    senderCardExpiryDate: '2015-10',
    senderCurrencyCode: 'USD',
    senderPrimaryAccountNumber: '4895142232120006',
    surcharge: '11.99',
  });
  config.url = process.env.VD_PULL_URL;
  config.data = data;
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      throw new Error('visa direct pull funds API error');
    });
};

/**
 * Source from: https://stackoverflow.com/questions/38816337/convert-javascript-date-format-to-yyyy-mm-ddthhmmss?rq=1
 * Author: jafarbtech
 */
function getLocalTime() {
  return new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
}

module.exports = { PushFundsTransaction, PullFundsTransaction, ReverseFundsTransaction };
