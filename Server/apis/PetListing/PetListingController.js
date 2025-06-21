const PetModel = require("./PetListingModel")
const { uploadImg } = require("../../Utilities/helper")
// ADD API
add = (req,res)=>{
    let validation = ""
    let formData=req.body 
    console.log(req.file);
    if(!formData.petName){
        validation+="Pet Name is required"
    }  
    if(!formData.breedId){
        validation+="Breed is required"                        
    } 
    if(!formData.petType){
        validation+="PetType is required"
    }  
    if(!formData.description){
        validation+="Description is required"
    }
    if(!req.file){
        validation+="Image is required"
    }
    console.log(1);
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }
    else{
        console.log(2);
        PetModel.findOne({petName:formData.petName})
        .then(async (petData)=>{
            console.log(3.1);
                if(!petData){
                    let petObj= new PetModel()
                    console.log(3.2);
                    let total=await PetModel.countDocuments().exec()
                    petObj.autoId=total+1
                    petObj.petName=formData.petName
                    petObj.petType=formData.petType
                    petObj.breedId=formData.breedId
                    petObj.description=formData.description
                    let url=await uploadImg(req.file.buffer)
                    petObj.image=url
                    petObj.save()
                    .then((petData)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Pet Added!!",
                            data:petData
                        })
                    })
                    .catch((err)=>{
                        res.json({
                            status:500,
                            success:false,
                            message: "Internal Server Error",
                            error:err.message
                        })
                    })
                console.log(3);
            }
            else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data already exist on given name"
                })
            }

        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message: "Internal Server Error",
                error:err.message
            })
        })
        console.log(4);
    }
}
// ALL API
all=(req,res)=>{
    let formData=req.body
    let limit =formData.limit
    let currentPage=formData.currentPage
    delete formData.limit 
    delete formData.currentPage
    PetModel.find(req.body)
    .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (petData)=>{
        if(petData.length>0){
            let total=await PetModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Pet loaded",
                total:total,
                data:petData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"pet not found!!"
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
        PetModel.findOne({_id:req.body._id})
        .then((petData)=>{
            if(!petData){
                res.json({
                    status:404,
                    success:false,
                    message:"No pet found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Pet Loaded",
                    data:petData
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
        PetModel.findOne({_id:formData._id})
        .then((petData)=>{
            if(!petData){
                res.json({
                    status:404,
                    success:false,
                    message:"Petdata doesn't exist"
                })
            }else{
                if(!!formData.petName){
                    petData.petName=formData.petName 
                }  
                if(!!formData.petType){
                    petData.petType=formData.petType 
                } 
                if(!!formData.breedId){
                    petData.breedId=formData.breedId 
                }
                if(!!formData.description){            
                    petData.description=formData.description
                }
                petData.save()
                .then((petData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Pet updated",
                        data:petData
                    })
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
//CHANGE STATUS API 
changeStatus=(req, res)=>{
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
        PetModel.findOne({_id:formData._id})
        .then((petData)=>{
            if(!petData){
                res.json({
                    status:404,
                    success:false,
                    message:"Petdata doesn't exist"
                })
            }else{
                // petData.status=formData.status
                petData.status=!petData.status
                petData.save()
                .then((petData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        data:petData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!"
                    })
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

module.exports ={add, all, single, update, changeStatus}