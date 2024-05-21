const mongoose  = require('mongoose');
const { number } = require('zod');
const { use } = require('../routes/user');

mongoose.connect("mongodb://localhost:27017/paytm-clone")

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        minLenght:3,
        maxLenght:30
    },
    firstName : {
        type : String,
        required : true,
        minLenght:3,
        maxLenght:30
    },
    lastName : {
        type : String,
        required : true,
        minLenght:3,
        maxLenght:30

    },
    password : {
        type : String,
        required : true,
        minLenght:6
    },
    mobileNumber : {
        type : Number,
        required : true,
        minLenght: 10,
        maxLenght:10,
        unique : true
    },
    accountNumber : {
        type : Number,
        required : true,
        minLenght : 12,
        maxLenght : 12,
        unique : true
    }


})
const accountSchema = new mongoose.Schema({
    accountNumber : {
        type : Number,
        ref : 'User',
        required : true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User',userSchema)

module.exports = {
    User : User,
    Account : Account
}