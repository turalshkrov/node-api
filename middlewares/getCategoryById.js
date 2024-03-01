const Category = require('../models/category');

const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if(id.length !== 24) return res.status(400).json({ message: 'Invalid id value' });
    const category = await Category.findById(id);
    if(!category) return res.status(404).json({ message: 'Category not found' });
    res.category = category;
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
}

module.exports = getCategoryById;