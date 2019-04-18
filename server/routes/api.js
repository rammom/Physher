const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Attack = require('../models/Attack');
const User = require('../models/User');

const config = require('../config.json');

router.get('/clicked', async (req, res, next) => {
	let record_id = req.query.attack_record;
	let email = req.query.email;
	if (!record_id || !email) return res.status(400).send('bad request');

	let attack = null;
	let error = null
	await Attack.findById(record_id)
		.then(a => attack = a)
		.catch(e => error = e);

	if (error) return res.status(500).send('internal server error');
	if (!attack) return res.status(400).send('bad request');

	if (!attack.clicked) attack.clicked = [];
	if (attack.clicked.indexOf(email) == -1) attack.clicked.push(email);

	await attack.save();

	res.status(200).send("You've just been phished by Physher! Watch out for suspicious looking emails next time!");
});

router.post('/create_attack_record', async (req, res, next) => {
	if (!req.user) return res.json(400).send('error');

	let date = req.body.date;
	let to = req.body.to;
	let from = req.body.from;
	let title = req.body.title;

	let attack = new Attack({
		date,
		to,
		from,
		title
	});

	await attack.save();

	let user = null;
	let error = null;
	await User.findById(req.user._id)
		.then(usr => user = usr)
		.catch(err => error = err);

	console.log(user);

	if (error) return res.json(500).send('error');
	if (!user) return res.json(400).send('error');

	if (!user.attacks) user.attacks = [];
	user.attacks.push(attack._id);

	await user.save();

	return res.status(200).json({
		record_id: attack._id,
	});

});

router.post('/sendmail', async (req, res, next) => {
	
	let from_name = req.body.from_name ? req.body.from_name : "";
	let from_email = req.body.from_email;
	let to_emails = req.body.to_emails;
	let cc_emails = req.body.cc_emails ? req.body.cc_emails : "";
	let bcc_emails = req.body.bcc_emails ? req.body.bcc_emails : "";
	let subject = req.body.subject ? req.body.subject : "";
	let body_html = req.body.body_html;
	let record_id = req.body.record_id;

	if (!from_email || !to_emails | !body_html) {
		await Attack.remove({_id: record_id});
		return res.status(400).send("bad request");
	}

	let transporter = nodemailer.createTransport({
		sendmail: true,
		newline: 'unix',
		path: '/usr/sbin/sendmail'
	});

	let error = null;

	let to = to_emails.split(",");

	console.log(record_id);
	if (!record_id) {
		return res.status(400).send("bad request");
	}
	
	for (let i = 0; i < to.length; ++i){
		let email = to[i];
		email = email.replace(/ /g, "");
		let html = body_html.replace(/<-LINK->/g, `${config.host}/api/clicked?attack_record=${record_id}&email=${email}`);
		await transporter.sendMail({
			from: `${from_name} ${from_email}`,
			to: email,
			cc: cc_emails,
			bcc: bcc_emails,
			subject: subject,
			html: html,
		}, (err, info) => {
			if (err) return error = err;
			console.log(info.envelope);
			console.log(info.messageId);
		});
	}
	

	if (error) {
		return res.status(500).json({
			err,
			msg: "data not sent"
		});
	}
	else {
		return res.status(200).send('ok');
	}


});

module.exports = router;