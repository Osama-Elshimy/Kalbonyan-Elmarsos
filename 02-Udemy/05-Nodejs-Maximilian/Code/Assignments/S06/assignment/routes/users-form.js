const express = require('express');

const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
	res.render('users-form', {
		pageTitle: 'Users Form',
		path: '/',
	});
});

router.post('/', (req, res, next) => {
	users.push({ name: req.body.username });
	res.redirect('/users');
});

exports.routes = router;
exports.users = users;
