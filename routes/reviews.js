const express = require("express")
const router = express.Router({mergeParams: true});

const Campground = require("../models/campground")
const Review = require("../models/review")

const ExpressError = require("../utils/ExpressError")
const catchAsync = require("../utils/catchAsync");

const {reviewSchema} = require("../schema.js") 

const reviews = require("../controllers/reviews")

const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")





router.post("/",isLoggedIn, validateReview, catchAsync(reviews.createReview) )

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))




module.exports = router;