const mongoose  = require('mongoose');
const { Account } = require('../db/schema');


const transferFund = async(fromAccountID, toAccountID,amt)=>{
    console.log(fromAccountID, toAccountID,amt);
    try {
        await Account.findByIdAndUpdate(fromAccountID,{$in:{balance:-amt}})
        await Account.findByIdAndUpdate(toAccountID,{$inc : {balance : amt}})
        return true;
    } catch (error) {
        console.log("transferFund went wrong: " + error);
    }
    
}


module.exports = {
    transferFund: transferFund
}