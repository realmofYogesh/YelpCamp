const mongoose = require("mongoose");
const Campground = require("../models/campground")
//note: there path is with tow dots  
//which means we have back previous dir (here YelpCamp)
//and then look for models/campground
const cities = require("./cities")
//no need of js extention here

const {places, descriptors} = require("./seedHelpers.js")
//destructing the imported array data

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

// the connect method returns the promise
.then(()=> console.log("YelpCamp dbs connected :)"))
.catch((er) => console.log("error :( \n", er))

//In Data we going to store or push images urls
// let Data = [];

// const Fetching = async () =>{

// const res = await fetch("https://api.unsplash.com/search/photos?&query=campground&per_page=30&client_id=MvGvOVMiDmVcrzBncFavLJU-qX_LDbxWHL-oMWrJoOY")
// const data = await res.json()
//  Data = data.results.map(d => d.urls.regular)

// const res2 = await fetch("https://api.unsplash.com/search/photos?&query=campgrounds&per_page=30&client_id=MvGvOVMiDmVcrzBncFavLJU-qX_LDbxWHL-oMWrJoOY")
//  const data2 = await res2.json()
//  for (var i = data2.results.length - 1; i >= 0; i--) {
// 		Data.push(data2.results[i].urls.regular)
// 	}
// }

// Fetching()

// console.log("Data")


const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () =>{
	await Campground.deleteMany({});
	// const c = new Campground({title: "puple field"})
	// await c.save();
	
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random()*1000);
		const price = Math.floor(Math.random()*20) + 10;

		const camp = new Campground({
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			author: "64656dedc603744a927ab4ee",
			description: `An image description is a written caption that describes the essential
			information in an image. Image descriptions can define photos, graphics`,
			price,
			// geometry: { 
			//  	type: 'Point', 
			//  	coordinates: [ 75.818982, 26.915458 ] 
			// },

			geometry: { 
			 	type: 'Point', 
			 	coordinates: [ 
			 			cities[random1000].longitude,
			 			cities[random1000].latitude
			 		] 
			},

			images: [
			{
				url: 'https://res.cloudinary.com/df5bkgc9n/image/upload/w_600/v1684460131/YelpCamp/nhxsnar4xpnoexd6mzua.jpg',
				filename: 'YelpCamp/ebfxp6rvvho4r44tkap7',
			},
			{
				url: 'https://res.cloudinary.com/df5bkgc9n/image/upload/w_600/v1684450150/YelpCamp/trj7txbcpstv6yvjbpjv.jpg',
				filename: 'YelpCamp/vyo9wk19ygfeh3uxh6bm',
			}
			]
			

		})

		await camp.save()
	}
}



const seeding = async () =>{
	// await Fetching()
	// console.log(Data)
	
	await seedDB().then(() =>{
		mongoose.connection.close();
	// closing the connection to dbs
	})
}

seeding() // fetching and seeding to dbs


//so basicaly we seeding to the dbs (database)
//importing data 
//looping on data and adding to dbs
//and in last we closing the connecton to dbs







