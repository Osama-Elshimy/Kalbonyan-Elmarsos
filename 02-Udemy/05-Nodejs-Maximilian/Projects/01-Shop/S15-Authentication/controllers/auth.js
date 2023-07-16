const bcrypt = require('bcryptjs');

const User = require('../models/User');

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
