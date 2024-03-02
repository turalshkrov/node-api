const { validationResult } = require('express-validator');

const productValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = productValidation;