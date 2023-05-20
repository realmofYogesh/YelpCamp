
const Campground = require("../models/campground")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeocoding({accessToken: mapBoxToken})
//here geoCoder have forward and reverse geocode function
const {cloudinary} = require("../cloudinary")

module.exports.index = async (req,res)=>{
	console.log("/campgrounds all get")
	const campgrounds =  await Campground.find({});
	// const camp = new Campground({title: "My Backyard", description: "camping ONN"})
	// await camp.save();
	
	res.render("campgrounds/index", {campgrounds})
	
}


module.exports.newForm = async (req, res) =>{
	// console.log("/campgrounds/new")
	res.render("campgrounds/new")
}


module.exports.createNew = async (req,res)=>{
	const geoData =  await geoCoder.forwardGeocode({
		query: req.body.campground.location,
		limit: 1        //limiting to one result
	}).send()  // we have to send the query after calling the forwardGeocode fn
	// console.log(geoData)

	// console.log(req.body.campground);
	// if(!req.body.campground) throw new ExpressError("Invalid campground data", 400);
	//note: just below code is not mongo schema it's using joi
	//actually there we creating a server side validation with use of joi js package
	const campground = new Campground(req.body.campground)
	campground.geometry = geoData.body.features[0].geometry;
	campground.images = req.files.map(f => ({url: f.path, filename: f.filename}))   //req.files is by multer middleware
	campground.author = req.user._id;
	await campground.save()
	// console.log(campground)
	req.flash("success", "Successfully created a new Campground")
	res.redirect(`/campgrounds/${campground._id}`)
}


module.exports.showCamp = async (req,res)=>{
	console.log("/campgrounds/:id");
	// console.log(req.params.id)
	const campground = await Campground.findById(req.params.id).populate({
		path: "reviews",
		populate:{
			path: "author"   //it's populating the author associated with every review comment
		}
		}).populate("author");  // it's the user who created that campground.
	// campground.author = req.user._id;
	// console.log(campground)

	if(!campground){
		req.flash("error", "Cannot find that campground!")
		return res.redirect("/campgrounds")
	}
	res.render("campgrounds/show", {campground});
}


module.exports.editForm = async (req,res)=>{
	// console.log('/campgrounds/:id/edit get')
	const {id} = req.params;
	const campground = await Campground.findById(id)
	if(!campground){
		req.flash("error", "Cannot find that campground!")
		return res.redirect("/campgrounds")
	}
	res.render("campgrounds/edit", {campground})
}



module.exports.updateCamp = async (req,res)=>{
	// console.log("/campground/:id put");
	const {id} = req.params;
	const campground = await Campground.findById(id)
	if(!campground){
		req.flash("error", "Cannot find that campground")
		return res.redirect(`/campgrounds`)
	}
	// console.log(req.body)
	const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground})
	const imgs = req.files.map(f => ({url: f.path, filename: f.filename}))
	camp.images.push(...imgs);
	await camp.save();
	if(req.body.deleteImages){
		for(let filename of req.body.deleteImages){
			await cloudinary.uploader.destroy(filename)
		}
		await camp.updateOne({ $pull: {images: {filename: {$in: req.body.deleteImages}}}})
		console.log(camp)
	}

	req.flash("success", "Successfully Updated")
	res.redirect(`/campgrounds/${camp._id}`)
}

module.exports.deleteCamp = async (req,res) =>{
	console.log("/campgrounds/:id  delete");
	const {id} = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash("success", "Successfully Deleted Campground")
	res.redirect("/campgrounds")
}

