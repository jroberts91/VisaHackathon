const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { auth } = require('../middleware/auth');
const { imageUpload } = require('../utils/imageUpload');
const mongoose = require('mongoose');

//=================================
//            Product
//=================================

router.post('/create', auth, imageUpload, (req, res) => {
  const product = new Product(req.body);
  let images = [];
  req.files &&
    req.files.map((val, i) => {
      images.push(val.path);
    });
  product.images = images;
  product.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/getAll', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';

  let findArgs = { merchantId: req.body.merchantId };
  let term = req.body.searchTerm;
  for (let key in req.body.filters) {
    if (key === 'price') {
      findArgs[key] = {
        $gte: req.body.filters[key][0],
        $lte: req.body.filters[key][1],
      };
    } else {
      findArgs[key] = req.body.filters[key];
    }
  }
  console.log(findArgs);
  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .sort([[sortBy, order]])
      .exec((err, products) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, products, postSize: products.length });
      });
  } else {
    Product.find(findArgs)
      .sort([[sortBy, order]])
      .exec((err, products) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, products, postSize: products.length });
      });
  }
});

//?id=${productId}
router.get('/get', async (req, res) => {
  let productId = req.query.id;
  if (mongoose.isValidObjectId(productId)) {
    const product = await Product.findOne({ _id: productId });
    if (!product) return res.json({ success: false });
    return res.status(200).json({ success: true, product: product });
  } else return res.json({ success: false });
});

//?id=${productId}&soldQty=${soldQty}
router.get('/updateSoldQty', async (req, res) => {
  let productId = req.query.id;
  let soldQty = req.query.soldQty;
  if (mongoose.isValidObjectId(productId)) {
    const product = await Product.findOneAndUpdate({ _id: productId }, { soldQty: soldQty });
    if (!product) return res.json({ success: false });
    product.soldQty = soldQty;
    return res.status(200).json({ success: true, product: product });
  } else return res.json({ success: false });
});

//?id=${productId}&totalQty=${totalQty}
router.get('/updateTotalQty', async (req, res) => {
  let productId = req.query.id;
  let totalQty = req.query.totalQty;
  if (mongoose.isValidObjectId(productId)) {
    const product = await Product.findOneAndUpdate({ _id: productId }, { totalQty: totalQty });
    if (!product) return res.json({ success: false });
    product.totalQty = totalQty;
    return res.status(200).json({ success: true, product: product });
  } else return res.json({ success: false });
});

//?id=${productId}
router.get('/deleteProduct', async (req, res) => {
  let productId = req.query.id;
  if (mongoose.isValidObjectId(productId)) {
    const product = await Product.findOneAndUpdate({ _id: productId }, { show: false });
    if (!product) return res.json({ success: false });
    return res.status(200).json({ success: true });
  } else return res.json({ success: false });
});

module.exports = router;
