const express = require('express');
const router = express.Router();
const config = require('../config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');


passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function (username, password, done) {
		User.findOne({ username })
			.populate('attacks')
			.exec((err, user) => {
				if (err) return done(err);
				if (!user) {
					console.log('bad username');
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (password != user.password) {
					console.log('bad password');
					return done(null, false, { message: 'Incorrect password.' });
				}
				console.log(user);
				return done(null, user);
			})
	}
));

router.post('/register', async (req, res, next) => {
	let username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;

	console.log(req.body);

	if (!username) return res.status(400).json({msg: "bad username"});

	if (password != password2) return res.status(400).json({msg: "passwords don't match"});

	let user = new User({
		username,
		password
	});

	await user.save()
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		});

	user.password = null;
	return res.json({user});
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
	let user = req.user;
	user.password = null;
	return res.json({ user });
});

router.post('/logout', (req, res, next) => {
	if (req.user)
		req.logout();
	return res.json({msg: "logged out"});
});

module.exports = router;
