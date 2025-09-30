import { model, Schema } from 'mongoose';

const notesSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		}, content: {
			type: String,
			required: false,
		}, tag: {
			type: String,
			required: false,
			enum: ['Shopping', 'Meeting', 'Travel', 'Health', 'Work', 'Finance', 'Personal', 'Ideas', 'Important', 'Todo'],
			default: 'Todo',
		},
	}, {
	timestamps: true,
	versionKey: false,
},)

export const Note = model('Note', notesSchema);
