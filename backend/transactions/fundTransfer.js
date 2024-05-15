const mongoose  = require('mongoose');
const { Account } = require('../db/schema');


const transferFund = async(fromAccountID, toAccountID,amt)=>{
    console.log(fromAccountID, toAccountID,amt);
    try {
        const inc = await Account.findByIdAndUpdate(fromAccountID,{$inc:{balance:-amt}})
        const dec  = await Account.findByIdAndUpdate(toAccountID,{$inc : {balance : amt}})
        const userAuth = await Account.findOne({userId:toAccountID})
        console.log(userAuth);
    } catch (error) {
        console.log("transferFund went wrong: " + error);
    }
    
}


module.exports = {
    transferFund: transferFund
}