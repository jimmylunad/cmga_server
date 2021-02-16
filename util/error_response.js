const response 			= require('./defaultResponse');

exports.response = async (str_code, dev_message) => {

	let code 			= 0;
	let message 		= ``;
	let message_body 	= {};

	switch(str_code){
		case 'no_authorized_request':
			code  	= 599;
			message = 'No tiene permisos para solicitar una solicitud'
			break;
		case 'invalid_request':
			code 	= 600;
			message = 'Solicitud inválida'
			break;
		case 'invalid_session':
			code  	= 601;
			message = 'La sesión del usuario es inválida'
			break;
		case 'no_authorized':
			code  	= 602;
			message = 'No tiene permisos para solicitar este servicio'
			break;
		case 'required_params':
			code  	= 700;
			message = 'Existen campos obligatorios'
			break;
		case 'invalid_params':
			code  	= 701;
			message = 'Existen parámetros inválidos'
			break;
		case 'no_found_results':
			code  	= 702;
			message = 'Lo sentimos, no encontramos resultados'
			break;
		case 'invalid_code':
			code  	= 703;
			message = 'Código de verificación incorrecto ó vencido'
			break;
		case 'user_exist':
			code  	= 704;
			message = 'Usuario ya se encuentra registrado'
			break;
		case 'email_exist':
			code  	= 705;
			message = 'Correo electronico ya se encuentra registrado'
			break;
		case 'dni_exist':
			code  	= 706;
			message = 'Número de documento ya se encuentra registrado'
			break;
		case 'msisdn_exist':
			code  	= 707;
			message = 'Número telefónico ya se encuentra registrado'
			break;
		case 'account_number_exist':
			code  	= 708;
			message = 'Número de cuenta ya se encuentra registrado'
			break;
		case 'cci_exist':
			code  	= 709;
			message = 'Número cuenta interbancario (CCI) ya se encuentra registrado'
			break;
		case 'document_number_exist':
			code  	= 710;
			message = 'Número de documento o RUC ya se encuentra registrado'
			break;
		case 'sign_in_failed':
			code  	= 801;
			message = 'Nombre de usuario o contraseña incorrecta'
			break;
		case 'password_failed':
			code  	= 802;
			message = 'Contraseña incorrecta'
			break;
		case 'movements_failed':
			code  	= 803;
			message = 'Hubo un error al consultar los movimientos'
			break;
		case 'masiv_error':
			code  	= 901;
			message = 'Ocurrió un error al enviar SMS'
			break;
		case 'sms_error':
			code  	= 902;
			message = 'Se produjo un error al momento de enviar el SMS'
			break;
		case 'excel_error':
			code  	= 903;
			message = 'Se produjo un error al momento de subir Excel'
			break;
		case 'excel_missing':
			code  	= 904;
			message = 'No se encontro documento adjunto'
			break;
		case 'msisdn_missing':
			code  	= 905;
			message = 'Por favor, contáctese con Atención al Cliente para actualizar tus datos'
			break;
		case 'email_missing':
			code  	= 906;
			message = 'Por favor, contáctese con Atención al Cliente para actualizar tus datos'
			break;
		case 'request_failed':
			code  	= 910;
			message = '¡Ups! Ocurrió un error en el proceso. Vuelve a intentarlo en unos segundos.'
			break;
		default:
			code 	= 500;
			message = 'Error interno'
			break;
	}

	message_body = response.error(message, code, dev_message);

	return message_body;
}
