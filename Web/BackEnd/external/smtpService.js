const nodemailer = require('nodemailer');
// const handlebars = require('handlebars');
// const fs = require('fs');

require('dotenv').config();

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    } else {
      callback(null, html);
    }
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER_NAME,
    pass: process.env.GMAIL_USER_PASSWORD,
  },
});

let SendPaymentEmail = async (email) => {
  // readHTMLFile(__dirname + 'resources/payment.html', function(err, html) {
  //     var template = handlebars.compile(html);
  //     var replacements = {
  //          username: "John Doe"
  //     };
  //     var htmlToSend = template(replacements);
  //     const mailOptions = {
  //         from: process.env.GMAIL_USER_NAME, // sender address
  //         to: email, // list of receivers
  //         subject: 'ViSell - We have received your payment!', // Subject line
  //         html: htmlToSend// plain text body
  //     };
  //     smtpTransport.sendMail(mailOptions, function (error, response) {
  //         if (error) {
  //             console.log(error);
  //             callback(error);
  //         }
  //     });
  // });
  const mailOptions = {
    from: process.env.GMAIL_USER_NAME, // sender address
    to: email, // list of receivers
    subject: 'ViSell - We have received your payment!', // Subject line
    html: 'You should receive a confirmation email once your order has been fulfilled.', // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

let SendFulfillEmail = async (email) => {
  const mailOptions = {
    from: process.env.GMAIL_USER_NAME, // sender address
    to: email, // list of receivers
    subject: 'ViSell - Your Order has been Fulfilled!', // Subject line
    html: 'Your order has been confirmed.', // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};

module.exports = { SendPaymentEmail, SendFulfillEmail };
