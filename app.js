// only work in development not in productions
//it always run in development
//it's having access to .env files
if(process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

// console.log(process.env.SECRET)
// console.log(process.env.API_KEY)

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate")
const path = require("path")
const methodOverride = require("method-override")
const ExpressError = require("./utils/ExpressError");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")

const campgroundsRoutes = require("./routes/campgrounds")
const reviewRoutes = require("./routes/reviews")
const authUserRoutes = require("./routes/authUsers")

const session = require("express-session")
const flash = require("connect-flash")

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet")

// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

// // the connect method returns the promise
// .then(()=> console.log("YelpCamp dbs connected :)"))
// .catch((er) => console.log("error :( \n", er))

const MongoStore = require("connect-mongo")





const dbUrl =  process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp' ;




// || 'mongodb://localhost:27017/yelp-camp'

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const secret = process.env.SECRET  ||  "thisshouldbbeasecret"

const store = MongoStore.create({
	mongoUrl: dbUrl,
	touchAfter: 24*60*60,
	crypto: {
		secret,
	}
})

store.on("error", function(e){
	console.log("session store error",e)
})

const sessionConfig = {
	store,
	name: "session",
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,  // not be able to see session cookies by javascript
		// secure: true,    // it's mean this session cookie should work only on https
		expire: Date.now() + 1000*60*60*24*7,
		maxAge: 1000*60*60*24*7
	},
	
}

app.use(session(sessionConfig))
app.use(flash())
app.use(helmet( {contentSecurityPolicy: false}))



const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://stackpath.bootstrapcdn.com/",
    "https://www.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = ["https://fonts.gstatic.com/s/",
					"https://fonts.googleapis.com/",];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/df5bkgc9n/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

// To remove data using these defaults: (preventing from mongo or no-sql injection)
// app.use(mongoSanitize());

// Or, to replace these prohibited characters with _, use:
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use(express.urlencoded({extended: true}));
//this make sure post req body data is parsable
//to read and use that data
app.use(methodOverride("_method"));
//so we can send req other then get and post

// to use public directory 
// app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "public")))


app.engine("ejs", ejsMate) // it's like ejs using ejsMate 
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



app.use((req,res,next)=>{
	// console.log(req.session)
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	//note: it's have automatically access in template
	next()
})

app.get("/fakeUser", async (req,res)=>{
	const user = new User({email: "groot@gmail.com", username: "grootbaba"})
	const newUser = await User.register(user, "yoda")
	res.send(newUser)
})


app.use("/campgrounds", campgroundsRoutes)
app.use("/campgrounds/:id/reviews", reviewRoutes)
app.use("/", authUserRoutes)

app.get("/", (req,res)=>{
	console.log("homepage")
	res.render("home")
})


// it's for not existed path for every type of request
app.all("*", (req,res,next)=>{
	// res.send("404 !!!")
	next(new ExpressError("Page Not Found", 404))
})

app.use((err,req,res,next)=>{
	// const {statusCode = 500, message = " something went wrong"} = err;
	const {statusCode = 500 } = err;
	if(!err.message) err.message =  "Oh No, Something went wrong!";
	res.render("error", {err})
	// res.send("oh boy")
})


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log(`listening on port ${port} ): `)
})
































