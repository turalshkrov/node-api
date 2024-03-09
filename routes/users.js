const express = require('express');
const User = require('../models/user');
const getUserById = require('../middlewares/getUserById');
const userValidationRules = require('../validators/userValidationRules');
const userValidation = require('../middlewares/userValidation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const searchKey = req.query.search || '';
    const users = await User.find();
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.username.toLowerCase().includes(searchKey.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKey.toLowerCase()));
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', getUserById, async (req, res) => {
  try {
    res.json(res.user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', userValidationRules(), userValidation, async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const user = new User({ name, username, email });
    const newUser = await user.save();
    console.log(newUser);
    res.status(201).json({ 
      message: 'User created successfully', 
      content: newUser 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', getUserById, userValidationRules(), userValidation, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { name, username, email });
    res.json({ 
      message: 'User updated successfully', 
      content: updatedUser 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', getUserById, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(204).json({ 
      message: 'User deleted successfully', 
      content: deletedUser 
    });
  } catch (error) {
    res.json(500).json(error);
  }
});

module.exports = router;