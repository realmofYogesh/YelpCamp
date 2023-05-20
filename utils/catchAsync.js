const wrapper = (fn)=>{
	return (req,res,next) => {
		fn(req,res,next).catch(e => next(e))
		// fn(req,res,next).catch(next)
	}
}

module.exports = wrapper;