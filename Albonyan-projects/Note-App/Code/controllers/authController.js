import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
	const { username, email, password, confirmPassword, phone, birthYear } =
		req.body;

	if (password !== confirmPassword) {
		throw new BadRequestError('Passwords do not match');
	}

	if (
		!username ||
		!email ||
		!password ||
		!confirmPassword ||
		!phone ||
		!birthYear
	) {
		throw new BadRequestError('please provide all values');
	}

	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email already in use');
	}

	const user = await User.create({
		username,
		email,
		password,
		phone,
		birthYear,
	});
	const token = user.createJWT();

	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			username: user.username,
			phone: user.phone,
			birthYear: user.birthYear,
		},
		token,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new UnAuthenticatedError('No user with that email found');
	}

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Password is not correct');
	}

	const token = user.createJWT();
	user.password = undefined;

	res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
	const { email, username, password, phone, birthYear } = req.body;
	if (!email || !username || !password || !phone || !birthYear) {
		throw new BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ _id: req.user.userId }).select('+password');
	console.log(user);

	user.email = email;
	user.username = username;
	user.password = password;
	user.phone = phone;
	user.birthYear = birthYear;

	await user.save();

	const token = user.createJWT();

	user.password = undefined;
	console.log(user);

	res.status(StatusCodes.OK).json({ user, token });
};

const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	res.status(StatusCodes.OK).json({ user, token });
};

export { register, login, updateUser, getCurrentUser };
