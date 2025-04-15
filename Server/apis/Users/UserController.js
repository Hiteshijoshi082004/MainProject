const UserModel = require("./UserModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET  = "MyProject@1234"
login = (req,res)=>{
    let formData = req.body
    let validation =""
    if(!formData.email){
        validation+="email is required"
    }
    if(!formData.password){
        validation+="password is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        console.log(123);
        
        UserModel.findOne({email:formData.email})
        .then((userData)=>{
            if(userData){
                res.json({
                    status:200,
                    success:false,
                    message:"User doesn't exist on this email"
                })
                console.log(121621);
            }else{
                let result = bcryptjs.compareSync(formData.password, userData.password)
                if(result){
                    let payload = {
                        name:userData.name,
                        email:userData.email,
                        userId:userData._id,
                        userType:userData.userType
                    }
                    console.log(121621);
                    let token = jwt.sign(payload, SECRET, {expiresIn:"24h"})
                    res.json({
                        status:200,
                        success:true,
                        message:"Login successfully",
                        data:userData,
                        token:token
                    })
                    console.log(12123);
                    
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
            console.log(err);
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error"
            })
        })
    }
}

module.exports = {login}