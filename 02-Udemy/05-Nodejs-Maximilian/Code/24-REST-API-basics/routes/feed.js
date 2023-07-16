const epxress = require('express');

const feedController = require('../controllers/feed');

const router = epxress.Router();

router.get('/posts', feedController.getPosts);

router.post('/post', feedController.createPost);

module.exports = router;
