const response        = require('../../util/defaultResponse');
// const db              = require('../../util/database');
const error_response  = require('../../util/error_response');

const moment          = require('moment-timezone');
const _               = require('lodash');

const mail_contact    = require('../../mail-template/mail_contact');

const mailer          = require('../../util/mailer');

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