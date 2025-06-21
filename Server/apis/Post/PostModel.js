const mongoose = require("mongoose")
 
const PostSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    title:{type:String, deafult:""},
    image:{type:String, deafult:"no-pic.jpg"},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    description:{type:String, default:""},
    likes:[{type:Number, deafult:""}],
    status:{type:Boolean, deafult:true},
    createdAt:{type:Date, deafult:Date.now()}
})

module.exports = mongoose.model("PostModel",PostSchema)