const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create Task
router.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Tasks with User Info
router.get('/tasks', async (req, res) => {
    const tasks = await Task.find().populate('user');
    res.json(tasks);
});

// Update Task Completion Status
router.patch('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    res.json(task);
});

// Delete Task
router.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted");
});

// Filter Tasks
router.get('/filter', async (req, res) => {
    const completed = req.query.completed === 'true';
    const tasks = await Task.find({ completed }).populate('user');
    res.json(tasks);
});

module.exports = router;