const express=require("express")
const VolunteerController =require("../apis/Volunteers/VolunteerController")
const UserController = require("../apis/Users/UserController")
const NgoController = require("../apis/NGO/NGOController")
const BreedController = require("../apis/Breed/BreedController")
const PostController = require("../apis/Post/PostController")
const AdoptionController =  require("../apis/AdoptionRequest/AdoptionController")
const DonationController =  require("../apis/Donation/DonationController")
const PetStoryController = require("../apis/petStory/petStoryController")
const PetListingController = require("../apis/PetListing/PetListingController")
const router=express.Router()
const multer = require("multer")

// REGISTER
router.post("/Volunteers/register", VolunteerController.register)
router.post("/NGO/register", NgoController.register)
// LOGIN
router.post("/User/login", UserController.login)

// NGO 
router.post("/NGO/all", NgoController.all)
router.post("/NGO/single", NgoController.single)

// VOLUNTEER
router.post("/Volunteer/regsiter", VolunteerController.register)
router.post("/volunteers/single", VolunteerController.single)
// BREED 
let BreedStorage = multer.memoryStorage()
const BreedUpload = multer({storage:BreedStorage})
router.post("/Breed/add", BreedUpload.single("image"),BreedController.add)
router.post("/Breed/all",BreedController.all)
router.post("/Breed/single",BreedController.single)
router.post("/Breed/update",BreedController.updatebreed)
router.post("/Breed/changestatus",BreedController.changeStatus)
// PETLISTING
let PetStorage = multer.memoryStorage()
const PetUpload = multer({ storage: PetStorage })
router.post("/Petlisting/add",PetUpload.single("image"),PetListingController.add)
router.post("/petlisting/all",PetListingController.all)
router.post("/petlisting/single",PetListingController.single)
router.post("/petlisting/update",PetListingController.update)
router.post("/petlisting/changestatus",PetListingController.changeStatus)
// POST 
let PostStorage =  multer.memoryStorage()
const PostUpload = multer({storage: PostStorage})
router.post("/Post/add", PostUpload.single("image"),PostController.add)
router.post("/Post/all", PostController.all)
router.post("/Post/single", PostController.single)
router.post("/Post/update",PostController.update)
router.post("/Post/changestatus", PostController.changeStatus)

// ADOPTION 
router.post("/Adoption/add",AdoptionController.add)

// DONATION
router.post("/Donation/add",DonationController.add)
// PETSTORY
router.post("petStory/all", PetStoryController.all)
router.post("petStory/single", PetStoryController.single)
module.exports =router