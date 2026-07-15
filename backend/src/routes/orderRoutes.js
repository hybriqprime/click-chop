const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');
const { orderValidation, statusValidation } = require('../validators/orderValidators');
const validateRequest = require('../middleware/validateRequest');

router.post('/', protect, orderValidation, validateRequest, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, getOrderById);
router.patch('/:id/status', protect, adminOnly, statusValidation, validateRequest, updateOrderStatus);

module.exports = router;
