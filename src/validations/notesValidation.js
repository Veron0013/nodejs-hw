import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";
import { TAGS } from "../constants/tags.js";


const objectIdValidator = (value, helpers) => {
	return !isValidObjectId(value) ? helpers.message(`Invalid id format ${value}`) : value;
}

export const notesIdSchema = {
	[Segments.PARAMS]: Joi.object({
		noteId: Joi.string().custom(objectIdValidator).required(),
	}),
}


export const createNoteSchema = {
	[Segments.BODY]: Joi.object({
		title: Joi.string().min(1).max(230).required().messages({
			"string.base": "Title must be a string",
			"string.min": "Title should have at least {#limit} characters",
			"string.max": "Title should have at most {#limit} characters",
			"any.required": "Title is required",
		}),
		content: Joi.string().min(0).messages({
			"string.base": "Content must be a string",
			"string.min": "Content should have at least {#limit} characters",
		}),
		tag: Joi.string().valid(...TAGS).required().messages({
			'any.only': `Tag must be one of: ${TAGS.join(', ')}`,
			"any.required": "Tag is required",
		}),
	})
}

export const updateNoteSchema = {
	[Segments.PARAMS]: Joi.object({
		noteId: Joi.string().custom(objectIdValidator).required(),
	}),
	[Segments.BODY]: Joi.object({
		title: Joi.string().min(1).max(230),
		content: Joi.string().min(0),
		tag: Joi.string().valid(...TAGS),
	}).min(1)
}

export const getAllNotesSchema = {
	[Segments.QUERY]: Joi.object({
		page: Joi.number().integer().min(1).default(1),
		perPage: Joi.number().integer().min(5).max(20).default(10),
		search: Joi.string().min(0).max(30),
		tag: Joi.string().valid(...TAGS),
	})
}