import express from 'express';
const app = express();

import 'express-async-errors';

import dotenv from 'dotenv';
import morgan from 'morgan';

// DB and authenticateUser
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

dotenv.config();

app.use(express.json());

// app.get('/', (req, res) => {
// 	res.json({msg: 'Welcome to Jobify API'})
// });

app.get('/api/v1', (req, res) => {
	res.json({ msg: 'Welcome to Jobify API' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); // must be the last one

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
