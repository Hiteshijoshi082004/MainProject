const DonationModel = require("./DonationModel")

// ADD API
add = (req,res)=>{
    console.log(req.body);
    let validation="" 
    let formData=req.body
    if(!formData.donationType){
        validation += " Type is required"
    }
    if(!formData.donationDetails){
        validation += " Details are required"
    }
        if(!!validation){
        res.json({
            status:422,
            success:false,
            message:validation
        })
        console.log(2);
        
    }else{
        // duplicacy check 
        console.log(3);
        DonationModel.findOne({donationType:formData.donationType})
        .then(async (donationData)=>{
            console.log(21212);
            if(!donationData){
                let donationObj= new DonationModel()
                let total=await DonationModel.countDocuments().exec()
                donationObj.autoID=total+1
                donationObj.donationType=formData.donationType
                donationObj.donationDetails=formData.donationDetails 
                // donationObj.image="categoryimages/"+req.file.filename
                donationObj.save()
                .then((donationData)=>{
                    console.log(232);
                    
                    res.json({
                        status:200,
                        success:true,
                        message:"Donation Added!!",
                        data:donationData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error",
                        error:err
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"Data already exist on given name"
                })
            }   
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error!!",
                error:err
            })
        })
       
    }
}


module.exports = {add}