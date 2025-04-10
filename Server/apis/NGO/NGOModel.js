const mongoose =require("mongoose")

NGOSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    userId:{type:Number, default:1},
    description:{type:String, default:""},
    logo:{type:String, default:""},
    address:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    created_At:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("NGOModel", NGOSchema)