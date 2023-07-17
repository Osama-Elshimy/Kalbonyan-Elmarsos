import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		trim: true,
		minlength: 3,
		maxlenght: 20,
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		validator: {
			validator: validator.isEmail,
			message: 'Please provide a valid email',
		},
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 6,
	},
	lastName: {
		type: String,
		trim: true,
		minlength: 3,
		maxlength: 20,
		default: 'last name',
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'my city',
	},
});

UserSchema.pre('save', async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', UserSchema);
