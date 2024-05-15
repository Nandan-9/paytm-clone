const {Router} =  require("express")
const jwt = require("jsonwebtoken");
const { jwtAuth } = require("../middleware/userMiddlerware");
const { Account } = require("../db/schema");
const { transferFund } = require("../transactions/fundTransfer");

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

router.post("/transfer",jwtAuth,async(req,res)=>{


    const {toId,amount} = req.body

    const userID = req.userID

    const balance = await Account.findOne({userId:userID})
    if(balance - amount <= 0){
        res.json(
            {
                message: "Insufficient balance"
            }
        )
    }else{
        const userAuth = await Account.findOne({userId:toId})

        const fundtransfer = await transferFund(toId,userID,amount)
    }

})


module.exports = router
    



