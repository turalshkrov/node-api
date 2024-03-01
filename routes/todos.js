const express = require('express');
const getTodoById = require('../middlewares/getTodoById');
const todoValidationRules = require('../validators/todoValidationRules');
const todoValidation = require('../middlewares/todoValidation');
const Todo = require = require('../models/todo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', getTodoById, async (req, res) => {
  try {
    res.json(res.todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/', todoValidationRules(), todoValidation, async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const todo = new Todo({ title, isCompleted });
    const newTodo = await todo.save();
    res.status(201).json({
      message: 'Todo created',
      content: newTodo,
    })
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/:id', getTodoById, todoValidationRules(), todoValidation, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, isCompleted } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title, isCompleted
    });
    res.json({
      message: 'Todo Updated',
      content: updatedTodo,
    })
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', getTodoById, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.json({
      message: "Todo deleted",
      content: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
})

module.exports = router;