const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type:String,
        max:50
    },
    description: {
        type:String,
        max: 100
    },
    url: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    rating:{
        type: Number
    },
    shippingFee: {
        type: Number
    },
    merchantId:{
        type: String
    }
},{timestamps: true})

productSchema.index({ 
    merchantId:'text',
    name: 'text',
}, {
    weights: {
        merchantId: 5,
        name: 1,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }