const { uploadImg } = require("../../Utilities/helper")
const PostModel = require("./PostModel")
// ADD API
add= (req,res)=>{
    let validation="" 
    let formData=req.body 
    console.log(req.file);
    if(!formData.title){
        validation+=" Title is required"
    }  
    if(!formData.description){
        validation+="Description is required"
    }  
    if(!formData.likes){
        validation+="Likes are required"
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
        PostModel.findOne({title:formData.title})
        .then(async (postData)=>{
            if(!postData){
                let postObj= new PostModel()
                let total=await PostModel.countDocuments().exec()
                postObj.autoId=total+1
                postObj.title=formData.title
                postObj.description=formData.description 
                postObj.likes=formData.likes 
                let url=await uploadImg(req.file.buffer)
                postObj.image=url
                postObj.save()
                .then((postData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Post Added!!",
                        data:postData
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
                message:"Internal server error!!",
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
    PostModel.find(req.body)
    .limit(limit)
    .skip((currentPage-1)*limit)
    // .sort({createdAt:-1})
    .then(async (postData)=>{
        if(postData.length>0){
            let total=await PostModel.countDocuments().exec()
            res.json({
                status:200,
                success:true,
                message:"Post loaded",
                total:total,
                data:postData
            })
        }else{
            res.json({
                status:404,
                success:false,
                message:"Post not found!!"
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
        PostModel.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"No Post found!!"
                })
            }else{
                res.json({
                    status:200,
                    success:true,
                    message:"Post Loaded",
                    data:postData
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
        PostModel.findOne({_id:formData._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                if(!!formData.title){
                    postData.title=formData.title 
                }   
                if(!!formData.description){            
                    postData.description=formData.description
                }
                postData.save()
                .then((postData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Post updated",
                        data:postData
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
// CHANGESTATUS API
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
        PostModel.findOne({_id:formData._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data doesn't exist"
                })
            }else{
                postData.status=!postData.status
                postData.save()
                .then((postData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Status updated",
                        data:postData
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
module.exports = {add, all, single, update, changeStatus}