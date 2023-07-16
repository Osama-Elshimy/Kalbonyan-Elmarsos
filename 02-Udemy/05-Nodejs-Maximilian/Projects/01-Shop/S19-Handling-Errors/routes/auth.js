const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
	'/signup',
	[
		check('email')
			.isEmail()
			.normalizeEmail()
			.trim()
			.withMessage('Please enter a valid email.')
			.custom(async (email, { req }) => {
				const userDoc = await User.findOne({ email: email });
				if (userDoc) {
					return Promise.reject('E-Mail already exists!');
				}
			}),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long.'),
		body('confirmPassword').custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords must match!');
			}
			return true;
		}),
	],
	authController.postSignup
);

router.post(
	'/login',
	[
		body('email')
			.isEmail()
			.normalizeEmail()
			.trim()
			.withMessage('Please enter a valid email.'),
		body('password').isLength({ min: 6 }).withMessage('Password is incorrect.'),
	],
	authController.postLogin
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
