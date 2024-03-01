const express = require('express');
const Category = require('../models/category');
const getCategoryById = require('../middlewares/getCategoryById');
const categoryValidationRules = require('../validators/categoryValidationRules');
const categoryValidation = require('../middlewares/categoryValidation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', getCategoryById, async (req, res) => {
  try {
    res.status(200).json(res.category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', categoryValidationRules(), categoryValidation, async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    const category = new Category({ categoryName, description });
    const newCategory = await category.save();
    res.status(201).json({ 
      message: 'Category created succesfully', 
      content: newCategory 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', getCategoryById, categoryValidationRules(), categoryValidation, async (req, res) => {
  try {
    const id = req.params.id;
    const { categoryName, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { 
      categoryName, description 
    });
    res.json({
      message: 'Category updated successfully',
      content: updatedCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', getCategoryById, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(204).json({
      message: 'Category deleted successfully',
      content: deletedCategory,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;