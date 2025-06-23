const mongoose = require("mongoose")

VolunteerModelSchema = mongoose.Schema({
    autoId:{type:Number, default:1},
    userId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    userImage:{type:String, default:"no-pic.jpg"},
    address:{type:String, default:""},
    contact:{type:String, default:""},
    dob:{type:Date, default:null},
    status:{type:Boolean, default:"true"},
    createdAt:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("VolunteerModel", VolunteerModelSchema)