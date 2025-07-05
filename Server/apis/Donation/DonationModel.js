const mongoose = require("mongoose")

const DonationSchema = mongoose.Schema({
    autoID:{type:Number,default:1},
    addedById:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"UserModel"},
    ngoId:{type:mongoose.Schema.Types.ObjectId,default:null, ref:"NGOModel"},
    donationType:{type:String, default:""},
    donationDetails:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("DonationModel",DonationSchema)