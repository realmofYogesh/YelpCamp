// this is a dbs schema
// based on which data is going to
// be created
const Review = require("./review")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//https://res.cloudinary.com/df5bkgc9n/image/upload/w_500/v1684450150/YelpCamp/trj7txbcpstv6yvjbpjv.jpg


const ImageSchema = new Schema({
				url: String,
				filename: String

	})

ImageSchema.virtual("thumbnail").get(function(){
	return this.url.replace("/upload", "/upload/w_300")  //regular expression used here
});

const opts = { toJSON: {virtuals: true}}

const CampgroundSchema = new Schema({
	title: String,
	location: String,
	images: [ImageSchema],

	geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

	price: Number,
	description: String,

	author:{
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	
	reviews:[
	{
		type: Schema.Types.ObjectId,
		ref: "Review"
	}
	]

}, opts);	



CampgroundSchema.virtual("properties.popUpMarkup").get(function(){
	return ` <strong> <a href="/campgrounds/${this._id}" target="_blank">${this.title}</a></strong> 
	          <p>${this.description.substring(0,60)}...</p>`
});




// this will triggered by deleting a campground
// it's a mongoose middleware not express middleware
CampgroundSchema.post("findOneAndDelete", async function(doc){
	// console.log(doc) //there doc is deleted campground // it automatically passed when we delete
	if(doc){
		//Note:- remove() function is now deprecated for mongoose v5.5.3 and above. 
		//We use deleteOne(), deleteMany(), 
		await Review.deleteMany({
			_id: {

				$in: doc.reviews
			}
		})
	}
})						


module.exports = mongoose.model("Campground", CampgroundSchema)


















































