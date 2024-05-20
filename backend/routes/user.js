const {Router} =  require("express")
const jwt = require("jsonwebtoken");
const { Usermiddleware, jwtAuth, Updateduser } = require("../middleware/userMiddlerware");
const { User, Account } = require("../db/schema");
const { JWT_SECRET_KEY } = require("../cofigs/config");
const { initialiseFund } = require("../transactions/fundInitializer");
const router = Router();


router.get("/",(req, res)=>{
    res.json({
        msg : "working anu mone"
    })
})

router.post("/signup/",Usermiddleware,async(req,res)=>{
    const {firstName,lastName,password,userName,phoneNumber,accountNumber} = req.body;
    
    const dbResponse = await User.findOne({
        phoneNumber: phoneNumber
    })
    console.log(dbResponse);

    if(!dbResponse){
        const user = await User.create({
            firstName : firstName,
            lastName : lastName,
            userName : userName,
            phoneNumber : phoneNumber,
            accountNumber : accountNumber,
            password : password
        })
        const userId = user._id;
        const fund = await Account.create({
            accountNumber,
            userId,
            balance: Math.random()*(100000-1)+ 1
        })
        console.log(fund);
        const token = jwt.sign({
            userID: user._id,
        },JWT_SECRET_KEY)
        res.status(200).json({
            token : token,
            userID : user._id
            
        })
    }else{
        res.json({
            msg : "user already exists"
        })
    }
})


router.post("/signin/",Usermiddleware,async(req,res)=>{
    const {firstName,lastName,password,userName} = req.body;
    const dbResponse = await User.findOne({
        userName: userName,
        password: password
    })

    console.log(dbResponse);
    if(dbResponse.length != 0){

        const token = jwt.sign({
            userID: dbResponse._id,
        },JWT_SECRET_KEY)
        res.json(token)

    }else{
        res.json({
            msg : "User not authenticated"
        })
    }
})


router.post("/updateFLname",Updateduser,jwtAuth,async(req,res)=>{

    await User.updateOne(req.body,{
        id : req.userID
    })
    res.json({
        msg : "User updated successfully"
    })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router
    



