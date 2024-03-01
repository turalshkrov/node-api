const { body } = require('express-validator');

const userValidationRules = () => [
  body('name')
    .isLength({ min: 6, max: 30 }).withMessage('Name must be min 6, max 30 characters long')
    .matches(/[a-zA-Z\s]/).withMessage('Username can only contain lowercae letters of the alphabet and spaces'),
  body('username')
    .isLength({ min: 6, max: 30 }).withMessage('Username must be min 6, max 30 characters long')
    .matches(/[a-zA-Z]/).withMessage('Username can only contain lowercae letters of the alphabet'),
  body('email')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).withMessage('Ivalid email value')
];

module.exports = userValidationRules;