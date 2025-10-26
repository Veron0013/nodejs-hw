import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
	getAllNotes,
	getNoteById,
	createNote,
	deleteNote,
	updateNote
} from '../controllers/notesController.js';

import {
	createNoteSchema,
	noteIdSchema,
	getAllNotesSchema,
	updateNoteSchema
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/api/notes', authenticate)

router.get('/api/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/api/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/api/notes', celebrate(createNoteSchema), createNote);
router.delete('/api/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/api/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
