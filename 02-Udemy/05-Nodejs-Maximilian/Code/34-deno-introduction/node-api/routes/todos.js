const express = require('express');

const router = express.Router();

let todos = [];

router.get('/todos', (req, res, next) => {
	res.json({ todos });
});

router.post('/todos', (req, res, next) => {
	const newTodo = {
		id: new Date().toISOString(),
		text: req.body.text,
	};
	todos.push(newTodo);

	res.status(201).json({ message: 'Created todo' });
});

router.put('/todos/:todoId', (req, res, next) => {
	const id = req.params.todoId;

	const todoIndex = todos.findIndex(todo => todo.id === id);

	todos[todoIndex] = {
		id: todos[todoIndex].id,
		text: req.body.text,
	};

	res.status(200).json({ message: 'Updated todo' });
});

router.delete('/todos/:todoId', (req, res, next) => {
	todos = todos.filter(todo => todo.id !== req.params.todoId);
	res.status(200).json({ message: 'Todo deleted' });
});

module.exports = router;
