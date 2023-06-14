const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  taskType: {
    type: String,
    enum: ['Break', 'Meeting', 'Work'],
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  timeTaken: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
