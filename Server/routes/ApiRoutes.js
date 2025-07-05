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

// REGISTER ROUTES
// NGO REGISTER
let logoData = multer.memoryStorage()
const logoUpload = multer({storage:logoData})
router.post("/NGO/register",logoUpload.single("logo"),NgoController.register)
// VOLUNTEER REGISTER
let imageData = multer.memoryStorage()
const imageUpload = multer({storage:imageData})
router.post("/Volunteer/register",imageUpload.single("userImage") ,VolunteerController.register)
// LOGIN
router.post("/User/login", UserController.login)

// NGO 
router.post("/NGO/all", NgoController.all)
router.post("/NGO/single", NgoController.single)
router.post("/NGO/update", NgoController.update)
// VOLUNTEER 
router.post("/Volunteer/all", VolunteerController.all)
router.post("/volunteer/single", VolunteerController.single)
let updatedImg = multer.memoryStorage()
const updateImgUpload = multer({storage:updatedImg})
router.post("/Volunteer/update",updateImgUpload.single("userImage"),VolunteerController.update)
router.post("/Volunteer/changestatus",VolunteerController.changeStatus)
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
// let AdoptionStorage =  multer.memoryStorage()
// const AdoptionUpload = multer({storage: AdoptionStorage})
// router.post("/Adoption/add",AdoptionUpload.single("idProof"),AdoptionController.add)

// DONATION
router.post("/Donation/add",DonationController.add)
router.post("/Donation/all",DonationController.all)
// router.post("/Donation/single",DonationController.single)
// PETSTORY
router.post("/petstory/add",PetStoryController.add)
router.post("/petstory/all", PetStoryController.all)
router.post("/petstory/single", PetStoryController.single)
router.post("/petstory/update",PetStoryController.update)
router.post("/petstory/changestatus",PetStoryController.changeStatus)
module.exports =router