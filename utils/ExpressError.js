class ExpressError extends Error{

	constructor(message, statusCode){
		super()
		this.message = message
		this.statusCode = statusCode

		//note: there is not any default message and status 
		// in the Error class we just sets it here.
	}
}

module.exports = ExpressError;