// routes/tasks.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");
const { requireAuth } = require("../middleware/authMiddleware");

// Get all tasks for the authenticated user
router.get("/", requireAuth, async (req, res) => {
  try {
    const userId = req.query.userId; // Get userId from query parameter
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task for the authenticated user
router.post("/", requireAuth, async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const userId = req.user.userId; // Get userId from authenticated user
  const task = new Task({
    userId,
    title,
    description,
    dueDate,
    priority,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task (only if it belongs to the authenticated user)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: userId },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task (only if it belongs to the authenticated user)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      userId: userId,
    });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
