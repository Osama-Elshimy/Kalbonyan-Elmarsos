const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const eventRoutes = require('./routes/events');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use(authRoutes);

app.use('/events', eventRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all route for client-side routing
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message });
});

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
