// EXPRESS SETUP 
const express = require("express")

const app = express()

const PORT = 1708

const db  = require("./Server/config/db")
const seed = require("./Server/config/seed")
// TO APPROVE THE DATA 
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))
// CONTROLLER ROUTER CHECK 
const api=require("./Server/routes/ApiRoutes")
app.use("/apis", api)
// // ADMIN
// const admin=require("./Server/routes/AdminRoutes")
// app.use("/admin", admin)
app.listen(PORT,()=>{
    console.log("SERVER is running at PORT", PORT);
})
app.get("/",(req,res)=>{
    res.json({
        status: 200,
        success: true,
        Message: "Api is working"
    })
})