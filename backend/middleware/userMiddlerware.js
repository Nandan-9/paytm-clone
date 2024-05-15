const { JWT_SECRET_KEY } = require("../cofigs/config");
const { User } = require("../db/schema");
const { zodUser,UpdatedUser } = require("../zod/zod");
const jwt = require("jsonwebtoken")

function Usermiddleware(req, res, next) {
    const obj = req.body
    const validate = zodUser.safeParse(obj)
    if (validate.success) {
        next()

    }else{
        res.status(411).json({
            msg : "Invalid Type"
        })
    }
}

async function jwtAuth(req, res, next) {
    const authToken =  (req.headers.authorization).split(" ")[1]
    const validation = jwt.verify(authToken,JWT_SECRET_KEY)
    console.log(validation);
    if(validation.userID){
        req.userID = validation.userID
        next()

    }else{
        res.status(403).json({
            msg : "Invalid"
        })
    }
}

async function Updateduser(req, res, next) {
    const obj = req.body
    const validate = UpdatedUser.safeParse(obj)
    if (validate.success) {
        next()

    }else{
        res.status(411).json({
            msg : "Invalid Type"
        })
    }

}


const transferAuth = async(req, res, next) => {
    const{to,amount} = req.body
}





module.exports = {
    Usermiddleware,
    jwtAuth,
    Updateduser
}