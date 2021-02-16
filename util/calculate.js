const shortid 			= require('shortid-36');
const hash 				= require('object-hash');

let calculate_amount = async (amount, financing_type) => {

	let obj_response = {validate : true}
	let interest; 
	let tax;

	if(amount < 20 || amount > 500){
		obj_response.validate = false;
		return obj_response;
	}else{

		switch(financing_type){
			case 1: //direct
				interest 	= .08
				tax 		= 2
				break;
			case 2: //financing
				interest 	= .09
				tax 		= 2
				break;
		}

		let amount_to_pay = amount - (amount*interest) - tax

		obj_response.amount_to_pay 	= amount_to_pay;
		obj_response.interest 		= interest;
		obj_response.tax 			= tax;
		obj_response.iat 			= +new Date();

		let short_hash 				= shortid.generate(hash(obj_response))
		
		obj_response.hash 			= short_hash

		return obj_response

	}

	
}

exports.calculate_amount = calculate_amount;