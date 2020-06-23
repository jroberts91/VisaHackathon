const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const { Merchant } = require('../models/Merchant');
const { auth } = require('../middleware/auth');
const { imageUpload } = require('../utils/imageUpload');

//=================================
//             Merchant
//=================================

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.merchant._id,
    success: true,
    email: req.merchant.email,
    name: req.merchant.name,
  });
});

router.post('/register',imageUpload, async (req, res) => {
  
  //hashing password
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const merchant = new Merchant(req.body);
  if (req.files) merchant.profileImage= req.files[0].path;

  //save to mongoDB
  try {
    await merchant.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  //check if email exist
  const merchant = await Merchant.findOne({ email: req.body.email });
  if (!merchant)
    return res.json({
      success: false,
      message: 'Email is not found',
    });
  //check for valid password
  const validPass = await bcrypt.compare(req.body.password, merchant.password);
  if (!validPass)
    return res.status(400).json({
      success: false,
      message: 'Password is incorrect',
    });

  //generate authentication token
  await merchant.generateToken((err, merchant) => {
    //create and store token in DB
    if (err) return res.status(400).send(err);
    res
      .cookie('authToken', merchant.token, {
        //store token as cookie
        expires: new Date(Date.now() + 32 * 3600000), // cookie will be removed after 32 hours
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, merchantId: merchant._id });
  });
});

router.get('/logout', auth, (req, res) => {
  Merchant.findOneAndUpdate({ _id: req.merchant._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.post('/uploadProfileImage', auth, imageUpload, (req, res) => {
  Merchant.findOneAndUpdate({ _id: req.merchant._id }, { profileImage: req.files[0].path }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

router.post('/getAll', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';

  let findArgs = {};
  let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      findArgs[key] = req.body.filters[key];
    }
  }

  if (term) {
    Merchant.find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .exec((err, merchants) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, merchants, postSize: merchants.length });
      });
  } else {
    Merchant.find(findArgs)
      .sort([[sortBy, order]])
      .exec((err, merchants) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, merchants, postSize: merchants.length });
      });
  }
});

//?id=${merchantId}
router.get('/get', async (req, res) => {
  let merchantId = req.query.id;
  const merchant = await Merchant.findOne({ _id: merchantId });
  if (!merchant) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, merchant: merchant });
});

module.exports = router;
