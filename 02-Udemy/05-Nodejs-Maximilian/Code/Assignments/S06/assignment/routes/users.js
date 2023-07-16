const express = require('express');

const router = express.Router();

const usersForm = require('./users-form');

router.get('/users', (req, res, next) => {
	const usersList = usersForm.users;
	res.render('users', {
		pageTitle: 'Users',
		path: '/users',
		usersList: usersList,
		hasUsers: usersList.length > 0 ? true : false,
	});
});

module.exports = router;
