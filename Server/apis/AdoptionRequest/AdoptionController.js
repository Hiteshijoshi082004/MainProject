const AdoptionRequestModel = require("./AdoptionRequestModel")

// ADD API 
add = (req,res)=>{
    let validation = ""
    let formData = req.body
    if(!formData.petId){
        validation+="Pet Id is required"
    }
    if(!formData.userId){
        validation+="User Id is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        AdoptionRequestModel.findOne({petId:formData.petId})
        .then(async (adoptionData)=>{
            if(!adoptionData){
                let adoptionObj= new AdoptionRequestModel()
                let total=await AdoptionRequestModel.countDocuments().exec()
                adoptionObj.autoID=total+1
                adoptionObj.petId=formData.petId
                adoptionObj.userId=formData.userId 
                // adoptionObj.image="categoryimages/"+req.file.filename
                adoptionObj.save()
                .then((adoptionData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Adoption Added!!",
                        data:adoptionData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error",
                        error:err
                    })
                })
            }else{
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
                message:"Internal server error!!",
                error:err
            })
        })
       
    }
}

module.exports = {add}