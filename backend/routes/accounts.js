const {Router} =  require("express")
const jwt = require("jsonwebtoken");
const { jwtAuth } = require("../middleware/userMiddlerware");
const { Account } = require("../db/schema");
const { transferFund } = require("../transactions/fundTransfer");
const mongoose  = require('mongoose');

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
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    console.log(amount, to);

    const account = await Account.findOne({ userId: req.userID }).session(session);
    console.log(account);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    console.log(toAccount);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


module.exports = router
    



