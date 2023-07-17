import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
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

export default mongoose.model('User', userSchema);
