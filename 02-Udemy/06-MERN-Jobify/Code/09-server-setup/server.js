import express from 'express';

import dotenv from 'dotenv';
import connectDB from './db/connect.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server started on port ${port}...`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
