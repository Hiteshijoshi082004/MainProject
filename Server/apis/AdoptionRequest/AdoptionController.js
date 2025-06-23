// const { uploadImg } = require("../../Utilities/helper")
// const AdoptionRequestModel = require("./AdoptionRequestModel")
// // ADD API
// add= (req,res)=>{
//     let validation="" 
//     let formData=req.body 
//     console.log(req.file);
//     if(!req.file){
//         validation+=" idProof is required"
//     }  
//     if(!req.file){
//         validation+=" incomeCertificate is required"
//     } 
//     if(!req.file){
//         validation+=" bankStatement is required"
//     }  
//     if(!req.file){
//         validation+="addressProof is required"
//     }
//     if(!!validation){
//         res.json({
//             status:422,
//             success:false,
//             message:validation
//         })
//     }else{
//         AdoptionRequestModel.findOne({idProof:req.file.idProof})
//         AdoptionRequestModel.findOne({incomeCertificate:req.file.incomeCertificate})
//         AdoptionRequestModel.findOne({bankStatement:req.file.bankStatement})
//         AdoptionRequestModel.findOne({addressProof:req.file.addressProof})
        
//         .then(async (adoptionData)=>{
//             if(!adoptionData){
//                 let adoptionObj= new AdoptionRequestModel()
//                 let total=await AdoptionRequestModel.countDocuments().exec()
//                 adoptionObj.autoId=total+1
//                 // adoptionObj.title=formData.title
//                 // adoptionObj.description=formData.description 
//                 // adoptionObj.likes=formData.likes 
//                 let url=await uploadImg(req.file.buffer)
//                 adoptionObj.idProof=url
//                 adoptionObj.incomeCertificate=url
//                 adoptionObj.bankStatement=url
//                 adoptionObj.addressProof=url
//                 adoptionObj.save()
//                 .then((adoptionData)=>{
//                     res.json({
//                         status:200,
//                         success:true,
//                         message:"Adoption Data Added!!",
//                         data:adoptionData
//                     })
//                 })
//                 .catch((err)=>{
//                     res.json({
//                         status:500,
//                         success:false,
//                         message:"internal server error",
//                         error:err.message
//                     })
//                 })
//             }else{
//                 res.json({
//                     status:200,
//                     success:false,
//                     message:"Data already exist on given name"
//                 })
//             }
//         })
//         .catch((err)=>{
//             res.json({
//                 status:500,
//                 success:false,
//                 message:"Internal server error!!",
//                 error:err.message
//             })
//         })
       
//     }
// }
// module.exports ={add}