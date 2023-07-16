const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendGridTransporter = require('nodemailer-sendgrid-transport');

const User = require('../models/User');

const transporter = nodemailer.createTransport(
	sendGridTransporter({
		auth: {
			api_key:
				'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',
		},
	})
);

exports.getSignup = (req, res, next) => {
	let message = req.flash('error2');
	if (message.length > 0) message = message[0];
	else message = null;

	res.render('auth/signup', {
		path: '/signup',
		pageTitle: 'Signup',
		errorMessage: message,
	});
};

exports.postSignup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	try {
		const userDoc = await User.findOne({ email: email });

		const hashedPassword = await bcrypt.hash(password, 12);

		if (userDoc) {
			req.flash('error2', 'Email already exists.');
			return res.redirect('/signup');
		}

		const user = new User({
			email,
			password: hashedPassword,
			cart: { items: [] },
		});

		await user.save();

		res.redirect('/login');

		return transporter.sendMail({
			to: email,
			from: 'valid@mail.com', // This must be a valid email and must also be identefied
			subject: 'Signup succeeded!',
			html: '<h1>You successfully signed up!</h1>',
		});
	} catch (err) {
		console.log(err);
	}
};

exports.getLogin = (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) message = message[0];
	else message = null;

	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		errorMessage: message,
	});
};

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			req.flash('error', 'Invalid email.');
			return res.redirect('/login');
		}

		const doMatch = await bcrypt.compare(password, user.password);

		if (doMatch) {
			req.session.isLoggedIn = true;
			req.session.user = user;
			return req.session.save(err => {
				console.log(err);
				res.redirect('/');
			});
		}

		// The code will get here ONLY if doMath is falsy
		req.flash('error', 'Incorrect password.');
		res.redirect('/login');
	} catch (err) {
		console.log(err);
	}
};

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
};
