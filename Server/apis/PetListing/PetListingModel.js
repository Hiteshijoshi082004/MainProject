const mongoose = require("mongoose")

const PetListingModelSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    petName:{type:String, default:""},
    image:{type:String, deafult:"no-pic.jpg"},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, },
    breedId:{type:mongoose.Schema.Types.ObjectId, default:null , ref:"BreedModel"},
    petType:{type:String, deafult:""},
    description:{type:String, default:""},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("PetListingModel", PetListingModelSchema)