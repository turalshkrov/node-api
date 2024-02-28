const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
}, { collection: 'todos', versionKey: false });

module.exports = mongoose.model('todos', Todo);