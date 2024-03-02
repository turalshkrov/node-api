const Product = require('../models/product');

const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length !== 24) return res.status(400).json({ message: 'Invalid id value' });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.product = product;
  } catch (error) {
    res.status(500).json(error);
  }
  next();
}

module.exports = getProductById;