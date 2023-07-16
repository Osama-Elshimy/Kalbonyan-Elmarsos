const User = require('../models/User');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login',
		isAuthenticated: false,
	});
};

exports.postLogin = async (req, res, next) => {
	try {
		const user = await User.findById('643bba4dc6fdee9eedebb4f7');
		req.session.isLoggedIn = true;
		req.session.user = user;
		req.sessions.save(err => {
			console.log(err);
			res.redirect('/');
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
