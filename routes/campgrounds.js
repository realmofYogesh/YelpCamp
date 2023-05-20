const express = require("express")
const router = express.Router();

const Campground = require("../models/campground")
const catchAsync = require("../utils/catchAsync");

const campgrounds = require("../controllers/campgrounds")

const {isLoggedIn, isAuthor, validateCampground} = require("../middleware")

const multer = require("multer")
const {storage} = require("../cloudinary")
const upload = multer({storage});

router.route("/")
	.get( catchAsync(campgrounds.index))
	.post(isLoggedIn,  upload.array("image"), validateCampground, catchAsync(campgrounds.createNew))   
//note: we don't need to specify path here for get and post individually 
	// .post(upload.single("image"), (req,res)=>{     //thre image is fieldname of type file input
	// .post(upload.array("image"), (req,res)=>{     //thre image is fieldname of type file input
	// 	console.log(req.body, req.files)
	// 	res.send("it worked")
	// })




router.get("/new", isLoggedIn, catchAsync(campgrounds.newForm))

//campgrounds POST req for edit 

router.route("/:id")
	.get( catchAsync(campgrounds.showCamp))
	.put( isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCamp))
	.delete( isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))




router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editForm))







/// above code is more concise than below code using router.route()   the route() method
/// both have same functionaliy, just more concise version.


// router.get("/", catchAsync(campgrounds.index))


// router.get("/new", isLoggedIn, catchAsync(campgrounds.newForm))

// //campgrounds POST req for edit 
// router.post("/", isLoggedIn, validateCampground, catchAsync(campgrounds.createNew))

// router.get("/:id", catchAsync(campgrounds.showCamp))


// router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editForm))


// router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCamp))


// router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))


module.exports = router;