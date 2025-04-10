const mongoose = require("mongoose")

const petStorySchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    petID:{type:Number, default:1},
    title:{type:String, deafult:""},
    description:{type:String, default:""},
    addedById:{type:Number, default:1},
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("petStoryModel", petStorySchema);