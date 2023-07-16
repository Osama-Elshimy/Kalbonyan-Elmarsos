const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendGridTransporter = require('nodemailer-sendgrid-transport');

const { validationResult } = require('express-validator');

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
	let message = req.flash('error-email');
	if (message.length > 0) message = message[0];
	else message = null;

	res.render('auth/signup', {
		path: '/signup',
		pageTitle: 'Signup',
		errorMessage: message,
		oldInput: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationErrors: [],
	});
};

exports.postSignup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const errors = validationResult(req);
		console.log(errors.array());
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).render('auth/signup', {
				path: '/signup',
				pageTitle: 'Signup',
				errorMessage: errors.array()[0].msg,
				oldInput: {
					email,
					password,
					confirmPassword: req.body.confirmPassword,
				},
				validationErrors: errors.array(),
			});
		}

		const user = new User({
			email,
			password: hashedPassword,
			cart: { items: [] },
		});

		await user.save();

		res.redirect('/login');

		/* return transporter.sendMail({
			to: email,
			from: 'valid@mail.com', // This must be a valid email and must also be identefied SendGrid
			subject: 'Signup succeeded!',
			html: '<h1>You successfully signed up!</h1>',
		}); */
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
		oldInput: {
			email: '',
			password: '',
		},
		validationErrors: [],
	});
};

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).render('auth/login', {
				path: '/login',
				pageTitle: 'Login',
				errorMessage: errors.array()[0].msg,
				oldInput: {
					email,
					password,
				},
				validationErrors: errors.array(),
			});
		}

		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(422).render('auth/login', {
				path: '/login',
				pageTitle: 'Login',
				errorMessage: 'No user with that email found.',
				oldInput: {
					email,
					password,
				},
				validationErrors: [],
			});
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

		return res.status(422).render('auth/login', {
			path: '/login',
			pageTitle: 'Login',
			errorMessage: 'Password is incorrect.',
			oldInput: {
				email,
				password,
			},
			validationErrors: [],
		});
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

exports.getReset = (req, res, next) => {
	let message = req.flash('error-reset');
	if (message.length > 0) message = message[0];
	else message = null;

	res.render('auth/reset', {
		path: '/reset',
		pageTitle: 'Reset Password',
		errorMessage: message,
	});
};

exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, async (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect('/reset');
		}

		const token = buffer.toString('hex');

		try {
			const user = await User.findOne({ email: req.body.email });
			console.log(user);
			if (!user) {
				req.flash('error-reset', 'No account with that email found.');
				return res.redirect('/reset');
			}
			user.resetToken = token;
			user.resetTokenExpiration = Date.now() + 3600000; // Time in ms
			await user.save();

			res.redirect('/');

			transporter.sendMail({
				to: req.body.email,
				from: 'valid@mail.com', // This must be a valid email and must also be identefied SendGrid
				subject: 'Password reset',
				html: `
					<p>You requested a password reset</p>
					<p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
				`,
			});
		} catch (err) {
			console.log(err);
		}
	});
};

exports.getNewPassword = async (req, res, next) => {
	const token = req.params.token;
	try {
		let message = req.flash('error-new-password');
		if (message.length > 0) message = message[0];
		else message = null;

		const user = await User.findOne({
			resetToken: token,
			resetTokenExpiration: { $gt: Date.now() },
		});

		res.render('auth/new-password', {
			path: '/new-password',
			pageTitle: 'New Password',
			errorMessage: message,
			userId: user._id.toString(),
			passwordToken: token,
		});
	} catch (err) {
		console.log(err);
	}
};

exports.postNewPassword = async (req, res, next) => {
	const newPassword = req.body.password;
	const userId = req.body.userId;
	const passwordToken = req.body.passwordToken;

	try {
		const user = await User.findOne({
			resetToken: passwordToken,
			resetTokenExpiration: { $gt: Date.now() },
			_id: userId,
		});

		const hashedPassword = await bcrypt.hash(newPassword, 12);

		user.password = hashedPassword;
		user.resetToken = undefined;
		user.resetTokenExpiration = undefined;
		await user.save();

		res.redirect('/login');
	} catch (err) {
		console.log(err);
	}
};
