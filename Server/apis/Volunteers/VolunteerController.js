const UserModel = require("../Users/UserModel")
const bcryptjs=require("bcryptjs")
const VolunteerModel = require("./VolunteerModel")
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
    if(!formData.contact){
        validation+="contact is required "
    }
    // if(!formData.image){
    //     validation+="image is required "
    // }
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
                userObj.userType=2 
                userObj.save()
                .then(async (userData)=>{
                    //multi table insert
                    let volunteerObj=new VolunteerModel()
                    let total=await VolunteerModel.countDocuments().exec()
                    volunteerObj.autoId=total+1 
                    volunteerObj.phone=formData.phone
                    volunteerObj.address=formData.address
                    volunteerObj.userId=userData._id 
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

module.exports={register}