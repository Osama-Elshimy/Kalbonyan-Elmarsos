const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	// Attach CORS headers
	// Required when using a detached backend (that runs on a different domain)
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/posts', async (req, res) => {
	const storedPosts = await getStoredPosts();
	res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
	const storedPosts = await getStoredPosts();
	const post = storedPosts.find(post => post.id === req.params.id);
	res.json({ post });
});

app.post('/posts', async (req, res) => {
	const existingPosts = await getStoredPosts();
	const postData = req.body;
	const newPost = {
		...postData,
		id: Math.random().toString(),
	};
	const updatedPosts = [newPost, ...existingPosts];
	await storePosts(updatedPosts);
	res.status(201).json({ message: 'Stored new post.', post: newPost });
});

const buildPath = path.join(__dirname, 'client/dist');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(8080, () => {
	console.log('Server is running on port 8080');
});
