const UserModel = require("./UserModel")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const SECRET="MyProject@123"
login=(req,res)=>{
   let formData=req.body 
   let validation=""
   if(!formData.email){
    validation+="Email is required"
   }
   if(!formData.password){
    validation+="Password is required"
   }
   if(!!validation){
    res.json({
        status:422,
        success:false,
        message:validation
    })
   }else{
    UserModel.findOne({email:formData.email})
    .then((userData)=>{
        if(!userData){
            res.json({
                status:200,
                success:false,
                message:"User doesn't exist on given email"
            })
        }else{
           let result=bcryptjs.compareSync(formData.password, userData.password) 
            if(result){
                let payload={
                    name:userData.name,
                    email:userData.email,
                    userId:userData._id,
                    userType:userData.userType
                }
                
                let token=jwt.sign(payload, SECRET, {expiresIn:"24h"})
                res.json({
                    status:200,
                    success:true,
                    message:"Login successfully",
                    data:userData,
                    token:token
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Invalid credentials"
                })
            }
           
        }
        
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error!!",
            error:err
        })
    })
   }
}


module.exports={login}