const UserModel = require("../Users/UserModel")
const bcryptjs=require("bcryptjs")
const NGOModel = require("./NGOModel")

// REGISTER API
register=(req,res)=>{
    // console.log(123);
    let formData=req.body 
    let validation=""
    if(!formData.name){
        validation+="Name is required "
    }
    if(!formData.email){
        validation+="email is required "
    }
    if(!formData.password){
        validation+="password is required "
    }
    if(!formData.description){
        validation+="description is required "
    }
    // if(!req.file){
    //     validation+="logo is required "
    // } 
    if(!formData.address){
        validation+=" address is required "
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        UserModel.findOne({email:formData.email})
        .then(async (userData)=>{
            if(!userData){
                let userObj=new UserModel()
                let total=await UserModel.countDocuments().exec()
                userObj.autoId=total+1 
                userObj.name=formData.name 
                userObj.email=formData.email
                userObj.password=bcryptjs.hashSync(formData.password, 10)
                userObj.userType=2 

                userObj.save()
                .then(async (userData)=>{
                    //multi table insert
                    let ngoObj=new NGOModel()
                    let total=await NGOModel.countDocuments().exec()
                    ngoObj.autoId=total+1 
                    ngoObj.description=formData.description
                    ngoObj.address=formData.address
                    ngoObj.userId=userData._id 
                    ngoObj.save()
                    .then((ngoData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"NGO registered successfully!!",
                            data1:userData,
                            data2:ngoData
                        })
                    })
                    .catch((err)=>{
                        console.log();
                        
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error!!"
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist with same email",
                    data:userData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }
    
}

// ALL API
all=(req,res)=>{
    let formData = req.body
    let limit =formData.limit
    let currentPage = formData.currentPage
    delete formData.limit 
    delete formData.currentPage
    NGOModel.find(formData)
    .populate("userId")
    .limit(limit)
    .skip((currentPage-1)*limit)
    .then(async(ngoData)=>{
        if(ngoData.length>0){
            let total = await NGOModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"NGO data loaded",
                data:ngoData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"NGO data not found!!"
            })
       }
       
        
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err
        })
    })
}


// SINGLE API
single=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        NGOModel.findOne({_id:req.body._id})
        .populate("userId")
        .then((ngoData)=>{
            if(!ngoData){
                res.json({
                    status:404,
                    success:false,
                    message:"No NGO data found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"NGO data Loaded",
                    data:ngoData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!"
            })
        })
    }    
}

// CHANGE STATUS API
changeStatus = (req,res)=>{
    let validation=""
    let formData = req.body
    if(!formData.userId){
        validation+="userId is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        UserModel.findOne({_id:formData.userId})
        .then((ngoData)=>{
            if(!ngoData){
                res.json({
                    status:404,
                    success:false,
                    message:"NGO data not found"
                })
            }
            else{
                ngoData.status=!ngoData.status
                ngoData.save()
                .then((ngoData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"status updated",
                        data:ngoData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal Server Error",
                        error:err
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error",
                error:err
            })
        })
    }
}
module.exports={register, all, single, changeStatus}