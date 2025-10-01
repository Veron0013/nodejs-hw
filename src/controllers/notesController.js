
import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
	const notes = await Note.find();
	res.status(200).json(notes);
};

export const getNoteById = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const note = await Note.findById(noteId);

		if (!note) {
			next(get_404_ById(noteId));
			return;
		}

		res.status(200).json(note);
	} catch (error) {
		next(error)
	}

};

export const createNote = async (req, res) => {
	const newNote = await Note.create(req.body);
	res.status(201).json(newNote);
};

export const deleteNote = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const deletedNote = await Note.findOneAndDelete({
			_id: noteId,
		});

		if (!deletedNote) {
			next(get_404_ById(noteId));
			return;
		}

		res.status(200).json(deletedNote);
	} catch (error) {
		next(error)
	}
};

export const updateNote = async (req, res, next) => {
	const { noteId } = req.params;

	try {
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: noteId },
			req.body,
			{ new: true },
		);

		if (!updatedNote) {
			next(get_404_ById(noteId));
			return;
		}

		res.status(200).json(updatedNote);
	} catch (error) {
		next(error)

	}
};

const get_404_ById = (noteId) => {
	return createHttpError(404, `Note not found by id ${noteId}`)
} 