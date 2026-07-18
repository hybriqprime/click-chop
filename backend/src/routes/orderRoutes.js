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

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, deliveryAddress]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItem:
 *                       type: string
 *                       example: 6a57944e35866687c7c9199f
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               deliveryAddress:
 *                 type: string
 *                 example: 12 Admiralty Way, Lekki, Lagos
 *     responses:
 *       201:
 *         description: Order placed successfully, totalAmount calculated server-side
 *       400:
 *         description: Validation error, empty items, or unavailable item
 *       404:
 *         description: Menu item not found
 */
router.post('/', protect, orderValidation, validateRequest, createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get the logged-in customer's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of the current user's orders
 */
router.get('/my-orders', protect, getMyOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       403:
 *         description: Access denied, admin only
 */
router.get('/', protect, adminOnly, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by id (owner or admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       403:
 *         description: Access denied (not order owner or admin)
 *       404:
 *         description: Order not found
 */
router.get('/:id', protect, getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update an order's status (admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Preparing, Out for Delivery, Delivered, Cancelled]
 *                 example: Preparing
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid status value
 *       403:
 *         description: Access denied, admin only
 *       404:
 *         description: Order not found
 */
router.patch('/:id/status', protect, adminOnly, statusValidation, validateRequest, updateOrderStatus);

module.exports = router;
