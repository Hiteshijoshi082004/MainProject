const mongoose = require("mongoose")

VolunteerSchema = mongoose.Schema({
    autoID:{type:Number, default:1},
    userId:{type:Number, default:1},
    image:{type:String, default:""},
    contact:{type:String, default:""},
    dob:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    created_At:{type:Date, default:Date.now()}
})

module.exports = mongoose.model("VolunteerModel", VolunteerSchema)