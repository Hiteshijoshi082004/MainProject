const mongoose =require("mongoose")

NGOSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    description:{type:String, default:""},
    logo:{type:String, default:""},
    address:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    createdAt:{type:Date,default:Date.now()}

})

module.exports = mongoose.model("NGOModel", NGOSchema)