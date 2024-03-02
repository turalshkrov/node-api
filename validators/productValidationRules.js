const { body } = require('express-validator');

const productValidationRules = () => [
  body('title')
    .isLength({ min:3, max: 100 }).withMessage('Product name can be min 3, max 30 characters long'),
  body('price')
    .isNumeric().withMessage('Price must be number'),
  body('description')
    .isLength({ max: 300 }).withMessage('Description can be max 100 characters long'),
  body('categoryId')
    .isLength(24).withMessage('Invalid categoryId value'),
];

module.exports = productValidationRules;