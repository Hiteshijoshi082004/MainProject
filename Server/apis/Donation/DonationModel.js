const mongoose = require("mongoose")

const DonationSchema = mongoose.Schema({
    autoID:{type:Number,default:1},
    addedById:{type:Number, default:1},
    ngoId:{type:Number, default:1},
    donationType:{type:String, default:""},
    donationDetails:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    created_At:{type:Date,default:Date.now}
})

module.exports=mongoose.model("DonationModel",DonationSchema)