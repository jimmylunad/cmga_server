const response        = require('../../util/defaultResponse');
// const db              = require('../../util/database');
const error_response  = require('../../util/error_response');

const moment          = require('moment-timezone');
const _               = require('lodash');
const fs 			        = require('fs')

const mail_contact    = require('../../mail-template/mail_contact');
const mail_register   = require('../../mail-template/mail_register');


const mailer          = require('../../util/mailer');
const { Console } = require('console');

exports.contact = async ctx => {
  const actual_date = moment().tz("America/Lima");
  let mail_contact_template = mail_contact;

  const body = ctx.request.body;

  const { fullname, email, phone, message } = body;

  if(!fullname || !email || !phone || !message) {
    return ctx.body = await error_response.response('Parametros requeridos', 'Campos obligatorios: fullname, email, phone, message');
  }

  mail_contact_template = mail_contact_template.replace('@NAME', fullname);
  mail_contact_template = mail_contact_template.replace('@EMAIL', email);
  mail_contact_template = mail_contact_template.replace('@PHONE', phone);
  mail_contact_template = mail_contact_template.replace('@MESSAGE', message);

  mailer.sendMail(
		{
			from: process.env.EMAIL_SENDER,
			to: process.env.EMAIL_TO,
			subject: 'Formulario de contacto',
			html: mail_contact_template
		}
	).then(val => {
      console.log(val)
    }).catch(err => {
      console.log(err)
    }
  );

  return ctx.body = response.success({}, 'Se envió con exito')
}

exports.postulant = async ctx => {
  const actual_date = moment().tz("America/Lima");
  let mail_register_template = mail_register;
  let files;

  const body = ctx.req.body;

  const {
    operation_number,
    document_number,
    names,
    lastnames,
    mobile_phone,
    mail
  } = body;

  try {
    files = ctx.req.files;
    console.log(files[0]);
    console.log('entro la info');
    if(!files) return ctx.body = response.error('Archivo no encontrado', 820, 'No se subio ningun archivo');
  } catch(err){
		console.log('ERROR EN ARCHIVO:', err)
		return ctx.body = response.error('Hubo un error al subir archivo', 811, 'Hubo un error al subir archivo');
	}

  if(
    !files || !operation_number || !document_number || !names || !lastnames || !mobile_phone || !mail
  ) {
    return ctx.body = await error_response.response('Parametros requeridos', 'Campos obligatorios: file_deposit, operation_number, document_number, names, lastnames, mobile_phone, mail');
  }

  mail_register_template = mail_register_template.replace('@OPERATION_NUMBER', operation_number);
  mail_register_template = mail_register_template.replace('@DOCUMENT_NUMBER', document_number);
  mail_register_template = mail_register_template.replace('@NAMES', names);
  mail_register_template = mail_register_template.replace('@LASTNAMES', lastnames);
  mail_register_template = mail_register_template.replace('@MOBILE_PHONE', mobile_phone);
  mail_register_template = mail_register_template.replace('@MAIL', mail);

  mailer.sendMail(
		{
			from: process.env.EMAIL_SENDER,
			to: process.env.EMAIL_TO,
			subject: 'Ficha de postulante',
			html: mail_register_template,
      attachments: [{filename: files[0].originalname, content: fs.createReadStream(files[0].path)}]
		}
	).then(val => {
      console.log(val)
    }).catch(err => {
      console.log(err)
    }
  );

  return ctx.body = response.success({}, 'Se envió con exito la ficha')
}