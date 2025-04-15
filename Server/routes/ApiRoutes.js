const express=require("express")
// const CustomerController = require("../apis/customers/CustomerController")
const VolunteerController =require("../apis/Volunteers/VolunteerController")
const UserController = require("../apis/Users/UserController")
const router=express.Router()


// REGISTER
router.post("/Volunteers/register", VolunteerController.register)
// LOGIN
router.post("/users/login", UserController.login)
module.exports =router