const { body } = require('express-validator');

const menuValidation = [
  body('name').trim().notEmpty().withMessage('Meal name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a number greater than 0'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('imageUrl').optional().trim(),
  body('isAvailable').optional().isBoolean().withMessage('isAvailable must be true or false'),
];

module.exports = { menuValidation };
