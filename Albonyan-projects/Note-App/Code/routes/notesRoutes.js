import express from 'express';
const router = express.Router();

import {
	createNote,
	deleteNote,
	getAllNotes,
	toggleNoteCompletion,
} from '../controllers/notesController.js';

router.route('/').post(createNote).get(getAllNotes);
router.route('/:id').delete(deleteNote);
router.route('/:id/toggle').patch(toggleNoteCompletion);

export default router;
