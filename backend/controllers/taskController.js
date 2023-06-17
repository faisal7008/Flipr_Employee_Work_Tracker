const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /tasks
// @access  Employee

const createTask = async (req, res) => {
  try {
    const { description, taskType, startTime, timeTaken } = req.body;
    if (!description || !taskType || !startTime || !timeTaken) {
      return res.status(401).json({ message: 'Please fill the necessary details' });
    }
    // Create a new task
    const task = await Task.create({
      description,
      taskType,
      startTime,
      timeTaken,
      createdBy: req.user.userId,
    });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Unable to create task' });
  }
};

// @desc    Get all tasks
// @route   GET /tasks/:employeeId
// @access  Employee

const getTasksByEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.params.employeeId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
};

// @desc    Get a task by ID
// @route   GET /tasks/:taskId
// @access  Employee

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch task' });
  }
};

// @desc    Update a task
// @route   PUT /tasks/:taskId
// @access  Employee

const updateTask = async (req, res) => {
  try {
    const { description, taskType, startTime, timeTaken } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { description, taskType, startTime, timeTaken },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ task: updatedTask, message: "Task updated succesfully" });
  } catch (error) {
    res.status(500).json({ error: 'Unable to update task' });
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:taskId
// @access  Employee

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete task' });
  }
};

module.exports = {
  createTask,
  getTasksByEmployee,
  getTaskById,
  updateTask,
  deleteTask,
};
