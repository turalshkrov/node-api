const { body } = require('express-validator');

const todoValidationRules = () => [
  body('title')
  .isLength({ min: 3, max: 30 }).withMessage('Todo title can be min 6, max 30 characters long'),
  body('isCompleted')
    .isBoolean().withMessage('isCompleted must be boolean'),
];

module.exports = todoValidationRules;