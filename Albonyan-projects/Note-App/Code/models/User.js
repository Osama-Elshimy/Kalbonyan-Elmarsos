import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 6,
		select: false,
	},
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		trim: true,
		maxlength: 20,
	},
	phone: {
		type: String,
		required: [true, 'Please provide a phone'],
		trim: true,
		maxlength: 20,
	},
	birthYear: {
		type: Number,
		required: [true, 'Please provide a birth year'],
		trim: true,
		maxlength: 4,
		minlength: 4,
	},
});

UserSchema.pre('save', async function () {
	// console.log(this.modifiedPaths())
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model('User', UserSchema);
