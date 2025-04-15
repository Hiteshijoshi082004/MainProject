const PetModel = require("./PetModel")

add = (req,res)=>{
    let validation=""
    let formData = req.body
    if(!petName){
        validation+="Pet name is required"
    }
    if(!req.file){
        validation+="image is required"
    }
    
}