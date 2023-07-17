import express from 'express';
const router = express.Router();

import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({
	windowMs: 1000 * 60 * 15, // 15 minutes
	max: 10,
	message: 'Too many requests from this IP, please try again after 15 minutes',
});

import {
	register,
	login,
	updateUser,
	getCurrentUser,
	logout,
} from '../controllers/authController.js';
import authenticateUser from '../middleware/auth.js';
import testUser from '../middleware/testUser.js';

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/logout').get(logout);

router.route('/updateUser').patch(authenticateUser, testUser, updateUser);
router.route('/getCurrentUser').get(authenticateUser, getCurrentUser);

export default router;
