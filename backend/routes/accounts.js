const {Router} =  require("express")
const jwt = require("jsonwebtoken");
const { jwtAuth } = require("../middleware/userMiddlerware");
const { Account } = require("../db/schema");
const mongoose  = require('mongoose');
const { number } = require("zod");

const router = Router();


router.get('/', (req, res) => {
    console.log(req.body);
    const {toId,amount} = req.body;3
    res.json({
        msg : "Hello"
    }
    )
})

router.get("/balance", jwtAuth,async(req, res)=>{

    const userID  = req.userID
    const acntDetails =  await Account.findOne({userId:userID})
    res.json({
        balance :  acntDetails.balance
    })

})

router.post("/transfer", jwtAuth, async (req, res) => {
    // the userID is used to authenticate the sender and
    // the mobileNumber is used to identify sender and make paymet

    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount,mobileNumber } = req.body;

    const account = await Account.findOne({ userId: req.userID }).session(session);
    console.log(account);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    // authenticating wheather the account exists or not using mNum 
    const toAccount = await Account.findOne({ mobileNumber: mobileNumber }).session(session);
    console.log(toAccount);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    // updated the userID field with mobile number 
    await Account.updateOne({ mobileNumber: mobileNumber }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


module.exports = router
    



