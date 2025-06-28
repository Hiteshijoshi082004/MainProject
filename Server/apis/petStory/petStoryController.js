const petStoryModel = require("./petStoryModel")
// ADD API
add= (req,res)=>{
    let validation="" 
    let formData=req.body 
    // console.log(req.file);
    if(!formData.title){
        validation+=" Title is required"
    }  
    if(!formData.description){
        validation+="Description is required"
    }  
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //duplicacy 
        petStoryModel.findOne({title:formData.title})
        .then(async (petStoryData)=>{
            if(!petStoryData){
                let petStoryData= new petStoryModel()
                let total=await petStoryModel.countDocuments().exec()
                petStoryData.autoId=total+1
                petStoryData.title=formData.title
                petStoryData.description=formData.description 
                petStoryData.petId=formData.petId
                petStoryData.save()
                .then((petStoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Story Added!!",
                        data:petStoryData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error",
                        error:err.message
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
                message:"Internal server error!",
                error:err.message
            })
        })
       
    }
}
// ALL API
all=(req,res)=>{
    let formData=req.body
    let limit =formData.limit
    let currentPage=formData.currentPage
    delete formData.limit 
    delete formData.currentPage
    petStoryModel.find(req.body)
    .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (petStoryData)=>{
        if(petStoryData.length>0){
            let total=await petStoryModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Story loaded",
                total:total,
                data:petStoryData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"Story not found!!"
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
        petStoryModel.findOne({_id:req.body._id})
        .then((petStoryData)=>{
            if(!petStoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Story found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Story Loaded",
                    data:petStoryData
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
        petStoryModel.findOne({_id:formData._id})
        .then((petStoryData)=>{
            if(!petStoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                if(!!formData.title){
                    petStoryData.title=formData.title 
                }   
                if(!!formData.description){            
                    petStoryData.description=formData.description
                }
                petStoryData.save()
                .then((petStoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Story updated",
                        data:petStoryData
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
// CAHNGE STATUS API
changeStatus=(req, res)=>{
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
        petStoryModel.findOne({_id:formData._id})
        .then((petStoryData)=>{
            if(!petStoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                // petStoryData.status=formData.status
                petStoryData.status=!petStoryData.status
                petStoryData.save()
                .then((petStoryData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        data:petStoryData
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

module.exports = { add, all, single, update, changeStatus}