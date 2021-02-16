exports.error = async (error, errorCode, errorDetail) => {

	let isString = typeof error === 'string';
	
	let obj = {
		success: false,
		error: {
			errorCode: errorCode || (isString ? 990 : (error.code || 990)),
			errorMessage: isString ? error : 'Ocurrió un error' // error.message
		}
	};

	if (['development', 'testing', 'staging'].indexOf(process.env.NODE_ENVIROMENT) > -1) {
		obj.error.errorMessageDetail = errorDetail  || (isString ? error : error.stack);
	}

	return obj;
};

exports.success = (data = {}, successMessage = 'Ok') => {
	return {
		success: true,
		body: {
			successMessage,
			data
		}
	};
};