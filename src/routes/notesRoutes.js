// src/routes/studentsRoutes.js

import { Router } from 'express';
import {
	getAllNotes,
	getNoteById,
	createNote,
	deleteNote,
	updateNote
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import { createNoteSchema, noteIdSchema, getAllNotesSchema, updateNoteSchema } from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
