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

let PushFundsTransaction = async () => {
  // hard coded for now
  var date = getLocalTime();
  var data = JSON.stringify({
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
    merchantCategoryCode: '6012',
    pointOfServiceData: { motoECIIndicator: '0', panEntryMode: '90', posConditionCode: '00' },
    recipientName: 'rohan',
    recipientPrimaryAccountNumber: '4957030420210496',
    retrievalReferenceNumber: '412770451018',
    senderAccountNumber: '4653459515756154',
    senderAddress: '901 Metro Center Blvd',
    senderCity: 'Foster City',
    senderCountryCode: '124',
    senderName: 'Mohammed Qasim',
    senderReference: '',
    senderStateCode: 'CA',
    sourceOfFundsCode: '05',
    systemsTraceAuditNumber: '451018',
    transactionCurrencyCode: 'USD',
    transactionIdentifier: '381228649430015',
    settlementServiceIndicator: '9',
    colombiaNationalServiceData: {
      countryCodeNationalService: '170',
      nationalReimbursementFee: '20.00',
      nationalNetMiscAmountType: 'A',
      nationalNetReimbursementFeeBaseAmount: '20.00',
      nationalNetMiscAmount: '10.00',
      addValueTaxReturn: '10.00',
      taxAmountConsumption: '10.00',
      addValueTaxAmount: '10.00',
      costTransactionIndicator: '0',
      emvTransactionIndicator: '1',
      nationalChargebackReason: '11',
    },
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
  // hard coded for now
  var date = getLocalTime();
  var data = JSON.stringify({
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
    cavv: '0700100038238906000013405823891061668252',
    foreignExchangeFeeTransaction: '11.99',
    localTransactionDateTime: date,
    retrievalReferenceNumber: '330000550000',
    senderCardExpiryDate: '2015-10',
    senderCurrencyCode: 'USD',
    senderPrimaryAccountNumber: '4895142232120006',
    surcharge: '11.99',
    systemsTraceAuditNumber: '451001',
    nationalReimbursementFee: '11.22',
    cpsAuthorizationCharacteristicsIndicator: 'Y',
    addressVerificationData: { street: 'XYZ St', postalCode: '12345' },
    settlementServiceIndicator: '9',
    colombiaNationalServiceData: {
      countryCodeNationalService: '170',
      nationalReimbursementFee: '20.00',
      nationalNetMiscAmountType: 'A',
      nationalNetReimbursementFeeBaseAmount: '20.00',
      nationalNetMiscAmount: '10.00',
      addValueTaxReturn: '10.00',
      taxAmountConsumption: '10.00',
      addValueTaxAmount: '10.00',
      costTransactionIndicator: '0',
      emvTransactionIndicator: '1',
      nationalChargebackReason: '11',
    },
    riskAssessmentData: {
      delegatedAuthenticationIndicator: true,
      lowValueExemptionIndicator: true,
      traExemptionIndicator: true,
      trustedMerchantExemptionIndicator: true,
      scpExemptionIndicator: true,
    },
    visaMerchantIdentifier: '73625198',
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

module.exports = { PushFundsTransaction, PullFundsTransaction };
