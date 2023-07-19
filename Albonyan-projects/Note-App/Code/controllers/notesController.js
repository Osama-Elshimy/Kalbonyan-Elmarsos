import { StatusCodes } from 'http-status-codes';

import Note from '../models/Note.js';
import checkPermissions from '../utils/checkPermissions.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const createNote = async (req, res) => {
	console.log(req.body);
	const { content } = req.body;
	if (!content) {
		throw new BadRequestError('Please provide a content');
	}

	req.body.createdBy = req.user.userId;

	const note = await Note.create(req.body);

	res.status(StatusCodes.CREATED).json({ note });
};

const getAllNotes = async (req, res) => {
	try {
		const notes = await Note.find({ createdBy: req.user.userId }).sort({
			completed: 1,
			createdAt: -1,
		});

		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deleteNote = async (req, res) => {
	const { id: noteId } = req.params;

	const note = await Note.findOne({ _id: noteId });

	if (!note) {
		throw new NotFoundError(`No note with id :${noteId}`);
	}

	checkPermissions(req.user, note.createdBy);

	await note.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Note removed' });
};

const toggleNoteCompletion = async (req, res) => {
	try {
		const { id: noteId } = req.params;

		const note = await Note.findOne({ _id: noteId });

		if (!note) {
			throw new NotFoundError(`No note with id :${noteId}`);
		}

		note.completed = !note.completed;
		await note.save();

		res.status(200).json({ note });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export { createNote, deleteNote, getAllNotes, toggleNoteCompletion };
