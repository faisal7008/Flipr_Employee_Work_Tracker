const express = require('express');
const router = express.Router();
const { createTask, getTasksByEmployee, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { auth } = require('../middlewares/authMiddleware');

// http://localhost:9000/task

router.post('/', auth, createTask);
router.get('/employee/:employeeId', auth, getTasksByEmployee);
router.get('/:taskId', auth, getTaskById);
router.put('/:taskId', auth, updateTask);
router.delete('/:taskId', auth, deleteTask);

module.exports = router;
