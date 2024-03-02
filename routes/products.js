const express = require('express');
const Product = require('../models/product');
const Category = require('../models/category');
const getProductById = require('../middlewares/getProductById');
const productValidationRules = require('../validators/productValidationRules');
const productValidation = require('../middlewares/productValidation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', getProductById, async (req, res) => {
  try {
    res.status(200).json(res.product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await Product.find({ categoryId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', productValidationRules(), productValidation, async (req, res) => {
  try {
    const { title, description, price, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if(!category) res.status(400).json({ message: 'Invalid categoryId value' });
    const product = new Product({ 
      title, description, price, categoryId 
    });
    console.log(product);
    const newProduct = await product.save();
    res.json({ 
      message: 'Product created successfully',
      content: newProduct 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', getProductById, productValidationRules(), productValidation, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if(!category) res.status(400).json({ message: 'Invalid categoryId value' });
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      title, description, price, categoryId
    });
    res.status(200).json({ 
      message: 'Product updated successfully', 
      content: updatedProduct 
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/id', getProductById, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({ 
      message: 'Product deleted successfully',
      content: deletedProduct,
    })
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;