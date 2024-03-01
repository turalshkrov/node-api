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

Todo.pre('save', async (next) => {
  this.title = this.title.toLowerCase().trim();
  next();
});

module.exports = mongoose.model('todos', Todo);