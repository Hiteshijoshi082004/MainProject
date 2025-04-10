// EXPRESS SETUP 
const express = require("express")

const app = express()

const PORT = 1708

// DATABASE CONNECTIVITY
const db = require("./Server/config/db")
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"40mb"}))

const api=require("./Server/routes/ApiRoutes")
app.use("/apis", api)

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