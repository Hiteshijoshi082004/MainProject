const UserModel = require("../Users/UserModel")
const bcryptjs=require("bcryptjs")
const {uploadImg} = require("../../Utilities/helper")
const VolunteerModel = require("./VolunteerModel")

// REGISTER API
register=(req,res)=>{
    // console.log(123);
    let formData=req.body 
    let validation=""
    if(!formData.name){
        validation+="Name is required "
    }
    if(!formData.email){        
        validation+="Email is required "
    }
    if(!formData.password){
        validation+="Password is required "
    }
    if(!formData.contact){
        validation+="Contact is required "
    }
    if(!req.file){
        validation+="User Profile is required "
    } 
    if(!formData.dob){
        validation+="date of birth is required "
    }
    if(!formData.address){
        validation+="address is required "
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
                userObj.userType=3
                userObj.save()
                .then(async (userData)=>{
                    //multi table insert
                    let volunteerObj=new VolunteerModel()
                    let total=await VolunteerModel.countDocuments().exec()
                    volunteerObj.autoId=total+1 
                    volunteerObj.contact=formData.contact
                    volunteerObj.address=formData.address
                    volunteerObj.dob = formData.dob
                    volunteerObj.userId=userData._id 
                    let url = await uploadImg(req.file.buffer)
                    volunteerObj.userImage = url 
                    volunteerObj.save()
                    .then((volunteerData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Volunteer registered successfully!!",
                            data1:userData,
                            data2:volunteerData
                        })
                    })
                    .catch((err)=>{
                        console.log();
                        
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server error!!",
                            error:err.message
                        })
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!",
                        error:err.message
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"User already exist with same email",
                    data1:userData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!",
                error:err.message
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
    VolunteerModel.find(formData)
    // .populate("userId")
    .limit(limit)
    .skip((currentPage-1)*limit)
    .then(async(volunteerData)=>{
        if(volunteerData.length>0){
            let total = await VolunteerModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Volunteer loaded",
                total:total,
                data:volunteerData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"Volunteer not found!!"
            })
       }
       
        
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            error:err.message
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
        VolunteerModel.findOne({_id:req.body._id})
        .then((volunteerData)=>{
            if(!volunteerData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Volunteer found!!"
                })
                console.log(4);
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Volunteer Loaded",
                    data:volunteerData
                })
            }
            
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!",
                error:err.message
            })
        })
    }    
}
// UPDATE API 
update=(req, res)=>{
    //validation 
    let validation=""
    let formData=req.body 
    if(!formData._id){
        validation+="_id is required"
    }
    if(!!validation.trim()){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        VolunteerModel.findOne({_id:formData._id})
        .then(async(volunteerData)=>{
            if(!volunteerData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                if(!!formData.address){
                    volunteerData.address=formData.address 
                }   
                if(!!formData.contact){            
                    volunteerData.contact=formData.contact
                }
                if(!!formData.dob){            
                    volunteerData.dob=formData.dob
                }
                if(!!req.file){
                    let url = await uploadImg(req.file.buffer)
                    volunteerData.userImage = url 
                }
                volunteerData.save()
                .then((volunteerData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Volunteer Details updated",
                        data:volunteerData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!",
                        error:err.message
                    })
                })                
            }        
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!",
                error:err.message
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
        .then((volunteerData)=>{
            if(!volunteerData){
                res.json({
                    status:404,
                    success:false,
                    message:" Volunteer not found"
                })
            }
            else{
                volunteerData.status=!volunteerData.status
                volunteerData.save()
                .then((volunteerData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"status updated",
                        data:volunteerData,
                        // data2:userData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal Server Error",
                        error:err.message
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal Server Error",
                error:err.message
            })
        })
    }
}
module.exports={register, all, single,update, changeStatus}