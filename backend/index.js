const express = require("express");
const bodyParser = require("body-parser")
const userRouter = require("./routes/user")
const accountRouter = require("./routes/accounts")
const cors = require("cors")
const app = express();
const PORT = 3000;


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/v1/user",userRouter);
app.use("/api/v1/accounts",accountRouter);


app.use ((err,req,res,next)=>{
    res.json({
      msg: "sorry something is up with the server !!!!"
    })
  })
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 



