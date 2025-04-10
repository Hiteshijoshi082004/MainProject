const mongoose = require("mongoose")
 
const PostSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    title:{type:String, deafult:""},
    image:{type:String, deafult:""},
    addedById:{type:Number, default:""},
    description:{type:String, default:""},
    likes:[{type:Number, deafult:""}],
    status:{type:Boolean, default:true},
    created_At:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("PostModel",PostSchema)