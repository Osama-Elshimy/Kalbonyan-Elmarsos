import express from 'express';
const app = express();

import 'express-async-errors';

import dotenv from 'dotenv';
import morgan from 'morgan';

// Deployment
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Security
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// DB and authenticateUser
import connectDB from './db/connect.js';

// Routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobRoutes.js';

// Middlewares
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

dotenv.config();

// only when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get('/api/v1', (req, res) => {
	res.json({ msg: 'Welcome to Jobify API' });
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// only when ready to deploy
app.get('*', function (request, response) {
	response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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
