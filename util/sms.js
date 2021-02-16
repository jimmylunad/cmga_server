const sendMsg = require('aws-sns-sms');

let aws_config = {
					accessKeyId 		: process.env.SECRET_KEY,
					secretAccessKey 	: process.env.SECRET_ACCESS_KEY,
					region 				: 'us-east-1'
				};

exports.aws_config = aws_config;