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
import { createNoteSchema, notesIdSchema, notesSchema, updateNoteSchema } from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', celebrate(notesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(notesIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(notesIdSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
