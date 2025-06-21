const mongoose = require("mongoose")
breedSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    name:{type:String, default:""},
    image:{type:String, default:"no-pic.jpg"},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})  
module.exports = mongoose.model("BreedModel", breedSchema);