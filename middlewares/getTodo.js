const Todo = require("../models/todo");

const getTodo = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length !== 24) return res.status(400).json({ message: 'Invalid id value' });
    const todo = await Todo.findById(id);
    if (!todo) { return res.status(404).json({ message: 'Todo not found' }) };
    res.todo = todo;
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
}

module.exports = getTodo;