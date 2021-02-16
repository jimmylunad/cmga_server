const jwt      				= require('jwt-simple');
const response 				= require('../util/defaultResponse');
const db 	   					= require('../util/database');
const error_response 	= require('../util/error_response');
const request     		= require('request-promise-native');


exports.log = async (ctx, next) => {
	console.log('request:', ctx.method, ctx.url);
	console.log('query:', ctx.query);
	console.log('headers:', ctx.request.headers)
	console.log('body:', ctx.request.body);
	console.log('auth:', ctx.header.authorization);
	await next();
	console.log('response:', ctx.response.status, ctx.response.body);
};

exports.handle_error = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.app.emit('error', err, ctx);
		return ctx.body = await error_response.response('error', err.toString());
	}
};