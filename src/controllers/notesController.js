
import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
	const { page = 1, perPage = 10, search, tag } = req.query;

	const skip = (page - 1) * perPage;

	const filter = {};

	if (search) {
		filter.$or = [
			{ title: { $regex: search, $options: "i" } },
			{ content: { $regex: search, $options: "i" } }
		];
	}

	if (tag) {
		filter.tag = tag;
	}

	const [totalNotes, notes] = await Promise.all([
		Note.countDocuments(filter),
		Note.find(filter).skip(skip).limit(Number(perPage)),
	]);

	res.status(200).json({
		page: Number(page),
		perPage: Number(perPage),
		totalNotes,
		totalPages: Math.ceil(totalNotes / perPage),
		notes,
	});
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