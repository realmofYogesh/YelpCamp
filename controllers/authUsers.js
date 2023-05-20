const User = require("../models/user")


module.exports.registerForm = async (req, res)=>{
	res.render("authUsers/register")
}

module.exports.registered = async (req,res)=>{
	try{

		const {username, password, email} = req.body;
		const user = new User({email, username});
		const regUser = await User.register(user, password)
	// console.log(regUser)
		req.login(regUser, err =>{
			if(err) return next(err);
			req.flash("success","Welcome to Yelp Camp")
			res.redirect("/campgrounds")

		})

	} catch(e){
		req.flash("error", e.message)
		res.redirect("/register")
	}
}


module.exports.loginForm = (req,res)=>{
	res.render("authUsers/login")
}


module.exports.logiNredirect = (req,res)=>{
	req.flash("success", "Welcome Back!")
	console.log(res.locals.returnTo)
	const redirectUrl = res.locals.returnTo || "/campgrounds" ;
  	// delete req.session.returnTo;
	res.redirect(redirectUrl)
}


module.exports.logout =  (req,res)=>{
	req.logout(function(err){     // this method added to req by passport
		if(err){
			return next(err)
		} 

		req.flash("success", "Goodbye!")
		res.redirect("/campgrounds")
	}); 
}