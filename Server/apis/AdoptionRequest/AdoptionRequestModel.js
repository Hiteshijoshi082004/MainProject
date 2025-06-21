const mongoose = require("mongoose")

AdoptionRequestSchema = mongoose.Schema({
    autoId:{type:Number,default:1},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    petId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"PetListingModel"},
    // userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    // idProof:{type:String,default:"no-pic.jpg"},
    // incomeCertificate:{type:String, default:"no-pic.jpg"},
    // bankStatement:{type:string, deafult:"no-pic.jpg"},
    // addressProof:{type:string, default:"no-pic.jpg"},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("AdoptionRequestModel", AdoptionRequestSchema)