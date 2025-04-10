const mongoose =require("mongoose")

mongoose.connect("mongodb://localhost:27017//Pets")
.then(()=>{
    console.log("Db is connected!!"); 
})
.catch((error)=>{
    console.log("Error while connect DB", error); 
})