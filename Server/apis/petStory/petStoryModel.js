const mongoose = require("mongoose")

const petStorySchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    petId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"PetListingModel"},
    title:{type:String, default:""},
    description:{type:String, default:""},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("petStoryModel", petStorySchema);