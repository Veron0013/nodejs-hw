import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

const PORT = process.env.PORT ?? 3030;

app.use(notesRoutes);

//MW
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);



//DB
await connectMongoDB();

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
