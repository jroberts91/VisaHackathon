const { Merchant } = require('../models/Merchant');

let auth = (req, res, next) => {
  let token = req.cookies.authToken;
  Merchant.findByToken(token, (err, merchant) => { //check token matches the one in DB
    if (err) throw err;
    if (!merchant)
      return res.json({
        isAuth: false,
        error: true
      });
    req.merchant = merchant;
    next();
  });
};

module.exports = { auth };