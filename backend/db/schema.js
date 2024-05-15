const mongoose  = require('mongoose');

mongoose.connect("mongodb+srv://devnandan:YPExdTmhfRC1j0qg@cluster0.dd2pa02.mongodb.net/paytm-clone")

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
    }

})
const accountSchema = new mongoose.Schema({
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