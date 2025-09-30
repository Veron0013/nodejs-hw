// src/middleware/errorHandler.js

import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
	// Якщо помилка створена через http-errors
	if (error instanceof HttpError) {
		return res.status(error.status).json({
			message: error.message || error.name,
		});
	}

	// Усі інші помилки — як внутрішні
	console.error(error);
	res.status(500).json({
		message: error.message,
	});
};
