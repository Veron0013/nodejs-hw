
import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
	const {
		page = 1,
		perPage = 10,
		search,
		tag,
		sortBy = "_id",
		sortOrder = "asc"
	} = req.query;

	const userId = req.user._id;

	const skip = (page - 1) * perPage;

	let notesQuery = Note.find({ userId });

	if (search) {
		notesQuery.where('$text').equals({ $search: search });
	}
	//if (search) {
	//	const regex = new RegExp(search, 'i');
	//	notesQuery = notesQuery.or([
	//		{ title: regex },
	//		{ content: regex },
	//	]);
	//}

	if (tag) {
		notesQuery.where("tag").equals(tag);
	}

	const [totalNotes, notes] = await Promise.all([
		notesQuery.clone().countDocuments(),
		notesQuery
			.skip(skip)
			.limit(Number(perPage))
			.sort({ [sortBy]: sortOrder }),
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
	const userId = req.user._id;

	const note = await Note.findOne({ _id: noteId, userId });

	if (!note) {
		next(get404ById(noteId));
		return;
	}

	res.status(200).json(note);
};

export const createNote = async (req, res) => {
	const newNote = await Note.create({ ...req.body, userId: req.user._id });
	res.status(201).json(newNote);
};

export const deleteNote = async (req, res, next) => {
	const { noteId } = req.params;
	const userId = req.user._id;

	try {
		const deletedNote = await Note.findOneAndDelete({
			_id: noteId,
			userId
		});

		if (!deletedNote) {
			next(get404ById(noteId));
			return;
		}

		res.status(200).json(deletedNote);
	} catch (error) {
		next(error)
	}
};

export const updateNote = async (req, res, next) => {
	const { noteId } = req.params;
	const userId = req.user._id;

	try {
		const updatedNote = await Note.findOneAndUpdate(
			{
				_id: noteId,
				userId
			},
			req.body,
			{ new: true },
		);

		if (!updatedNote) {
			next(get404ById(noteId));
			return;
		}

		res.status(200).json(updatedNote);
	} catch (error) {
		next(error)

	}
};

const get404ById = (noteId) => {
	return createHttpError(404, `Note not found by id ${noteId}`)
} 