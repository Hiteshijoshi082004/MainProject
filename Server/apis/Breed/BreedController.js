const { uploadImg } = require("../../Utilities/helper") 
const BreedModel = require("./BreedModel")

// ADD API 
add = (req,res)=>{
    let formData = req.body
    let validation =""
    console.log(req.file);
    if(!formData.name){
        validation+="Name is required"
    }
    if(!req.file){
        validation+="Image is required"
    }
    if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        BreedModel.findOne({name:formData.name})
        .then(async (breedData)=>{
            if(!breedData){
                let breedObj= new BreedModel()
                let total=await BreedModel.countDocuments().exec()
                breedObj.autoID=total+1
                breedObj.name=formData.name
                let url=await uploadImg(req.file.buffer)
                breedObj.image=url
                breedObj.save()
                .then((breedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Breed Added!!",
                        data:breedData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
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
// ALL API
all =(req,res)=>{
    let formData = req.body
    let limit = formData.limit
    let currentPage = formData.currentPage
    delete formData.limit 
    delete formData.currentPage
    BreedModel.find(formData)
    .limit(limit)
    .skip((currentPage-1)*limit)
    .then((breedData)=>{
        if(breedData.length>0){
            res.json({
                status:200,
                success:true,
                message:"Breed Loaded!",
                data:breedData
            })
        }
        else{
            res.json({
                status:404,
                success:false,
                message:"Breed not found"
            })
        }
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal Server Error!",
            error:err
        })
    })
}

// SINGLE API
single = (req,res)=>{
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
        BreedModel.findOne({_id:req.body._id})
        .then((breedData)=>{
            if(!breedData){
                res.json({
                    status:404,
                    success:false,
                    message:"No breed found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Breed Loaded",
                    data:breedData
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
updatebreed=(req, res)=>{
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
        BreedModel.findOne({_id:formData._id})
        .then((breedData)=>{
            if(!breedData){
                res.json({
                    status:404,
                    success:false,
                    message:"Breed doesn't exist"
                })
            }else{
                if(!!formData.name){
                    breedData.name=formData.name 
                }   
                breedData.save()
                .then((breedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Breed updated",
                        data:breedData
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
// CHANGE STATUS API
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
        BreedModel.findOne({_id:formData._id})
        .then((breedData)=>{
            if(!breedData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                // breedData.status = formData.status
                breedData.status=!breedData.status
                breedData.save()
                .then((breedData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        data:breedData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error!!",
                        error :err
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
module.exports = {add, all, single, updatebreed, changeStatus}


