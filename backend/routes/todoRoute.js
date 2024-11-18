const express = require('express');
const Todo = require('../models/todoModel');
const router = express.Router();

// Create a new To-Do
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const todo = await Todo.create({ title, description });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve all To-Dos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve a To-Do by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'To-Do not found' });

        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a To-Do by ID
router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: 'To-Do not found' });

        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: 'Bad Request' });
    }
});

// Delete a To-Do by ID
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ error: 'To-Do not found' });

        res.status(200).json({ message: 'To-Do item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
