const {campgroundSchema,reviewSchema} = require("./schema.js") 
const ExpressError = require("./utils/ExpressError");
const Campground = require("./models/campground")
const Review = require("./models/review")

module.exports.isLoggedIn = (req,res,next)=>{
	if(!req.isAuthenticated()){
		
		//store the url they are requesting
		// console.log(req.path, req.originalUrl)

		req.session.returnTo = req.originalUrl;  // saving cookie for session

		req.flash("error", "You must be signed in first!")
		return res.redirect("/login")
	}
	next()
}


module.exports.storeReturnTo = (req,res,next)=>{
	if(req.session.returnTo){
		res.locals.returnTo = req.session.returnTo;
	}
	next();
}


module.exports.validateCampground = (req, res, next) => {
	// campgrooundSchema is include from schema.js
	const {error} = campgroundSchema.validate(req.body);
	if(error){
	const msg = error.details.map(m => m.message).join(",");
	throw new ExpressError(msg, 400)
	}else{
		next()
	}
}

module.exports.validateReview = (req,res,next)=>{
	const {error} = reviewSchema.validate(req.body);
		if(error){
	const msg = error.details.map(m => m.message).join(",");
	throw new ExpressError(msg, 400)
	}else{
		next()
	}

}

module.exports.isAuthor = async (req,res,next)=>{
	const {id} = req.params
	const campground = await Campground.findById(id);
	if(!campground.author.equals(req.user._id)){
		req.flash("error", "You do not have permission to do that")
		return res.redirect(`/campgrounds/${id}`)
	}
	next();
}


module.exports.isReviewAuthor = async (req,res,next)=>{
	const {id, reviewId} = req.params
	const review = await Review.findById(reviewId);
	if(!review.author.equals(req.user._id)){
		req.flash("error", "You do not have permission to do that")
		return res.redirect(`/campgrounds/${id}`)
	}
	next();
}










