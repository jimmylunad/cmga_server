const nodemailer    = require('nodemailer');

module.exports = nodemailer.createTransport({
	pool: true,
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT || 465,
	secure: true, // use TLS
	auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD
	}
});