const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const merchantSchema = mongoose.Schema({
    name: {
        type:String,
        max:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        min: 5
    },
    description: {
        type: String,

    },
    profileImage: String,
    rating:{
        type: Number
    },
    token : {
        type: String,
    }
})

merchantSchema.index({ 
    name:'text',
    email: 'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        email: 3,
        description: 1,
    }
})

merchantSchema.methods.generateToken = function (cb) {
    var merchant = this;
    const token = jwt.sign({_id: merchant._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "32h"});
    merchant.token = token;
    merchant.save(function (err, merchant) {
        if (err) return cb(err)
        cb(null, merchant);
    })
}

merchantSchema.statics.findByToken = function (token, cb) {
    var merchant = this;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decode) {
        merchant.findOne({ "_id": decode, "token": token }, function (err, merchant) {
            if (err) return cb(err);
            cb(null, merchant);
        })
    })
}

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = { Merchant }