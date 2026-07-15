const { body } = require('express-validator');

const orderValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.menuItem').notEmpty().withMessage('Each item must reference a menu item'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Each item quantity must be at least 1'),
  body('deliveryAddress').trim().notEmpty().withMessage('Delivery address is required'),
];

const statusValidation = [
  body('status')
    .isIn(['Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'])
    .withMessage('Invalid order status'),
];

module.exports = { orderValidation, statusValidation };
