import { model, Schema } from 'mongoose';

const notesSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		}, content: {
			type: String,
			required: false,
			default: '',
			trim: true,
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
