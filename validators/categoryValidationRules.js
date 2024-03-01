const { body } = require('express-validator');

const categoryValidationRules = () => [
  body('categoryName')
    .isLength({ min: 3, max: 30 }).withMessage('Category name can be min 3, max 30 characters long')
    .matches(/[a-zA-Z\s]/).withMessage('Category name can only contain lowercae letters of the alphabet and spaces'),
  body('description')
    .isLength({ max: 100 }).withMessage('Description can be max 100 characters long'),
];

module.exports = categoryValidationRules;