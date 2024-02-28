const { body } = require('express-validator');

const todoValidationRules = () => [
  body('title').notEmpty().withMessage('Title can not be empty.'),
  body('isCompleted').isBoolean().withMessage('isCompleted must be boolean'),
];

module.exports = todoValidationRules;