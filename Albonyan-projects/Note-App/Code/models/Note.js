import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Note', NoteSchema);
