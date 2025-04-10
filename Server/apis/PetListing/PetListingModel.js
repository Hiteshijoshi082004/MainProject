const mongoose = require("mongoose")

const PetListingSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    petName:{type:String, default:""},
    image:{type:String, deafult:""},
    addedById:{type:Number, default:1},
    breed:{type:String, deafult:""},
    petType:{type:String, deafult:""},
    description:{type:String, default:""},
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("PetListingMOdel", PetListingSchema)