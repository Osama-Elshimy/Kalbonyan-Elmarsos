import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookies from '../utils/attachCookies.js';

const register = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError('Please provide all values.');
	}

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use.');
	}

	const user = await User.create({ name, email, password });
	const token = await user.createJWT();

	attachCookies({ res, token });
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name,
			lastName: user.lastName,
			email: user.email,
			location: user.location,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) throw BadRequestError('Please provide all values.');

	const user = await User.findOne({ email }).select('+password');
	if (!user) throw new UnAuthenticatedError('Invalid Credentials');

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) throw new UnAuthenticatedError('Invalid Credentials');

	const token = user.createJWT();
	user.password = undefined;

	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({ user, location: user.location });
};

const updateUser = async (req, res) => {
	const { email, name, lastName, location } = req.body;
	if (!email || !name || !lastName || !location) {
		throw new BadRequestError('Please provide all values.');
	}

	const user = await User.findOne({ _id: req.user.userId });

	user.email = email;
	user.name = name;
	user.lastName = lastName;
	user.location = location;

	await user.save();

	// Creating a new token is NOT necessary, because the user is already logged in.
	// But it's a good practice to create a new token when the user is updated. So that the expiration time is reset.
	const token = user.createJWT();

	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({ user, location: user.location });
};

const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now() + 1000),
	});
	res.status(StatusCodes.OK).json({ msg: 'User logged out!' });
};

export { register, login, updateUser, getCurrentUser, logout };
