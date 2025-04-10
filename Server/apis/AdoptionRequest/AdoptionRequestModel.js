const mongoose = require("mongoose")

AdoptionRequestSchema = mongoose.Schema({
    autoID:{type:Number,default:1},
    addedById:{type:Number, default:1},
    petID:{type:Number, default:1},
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("AdoptionRequestModel", AdoptionRequestSchema)