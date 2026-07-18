const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/auth');
const { menuValidation } = require('../validators/menuValidators');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: List all menu items (supports search & filter)
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search meals by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of menu items
 */
router.get('/', getAllMenuItems);

/**
 * @swagger
 * /api/menu/{id}:
 *   get:
 *     summary: Get a single menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item found
 *       404:
 *         description: Menu item not found
 */
router.get('/:id', getMenuItemById);

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Create a new menu item (admin only)
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, category]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jollof Rice
 *               description:
 *                 type: string
 *                 example: Smoky party-style jollof rice
 *               price:
 *                 type: number
 *                 example: 2500
 *               category:
 *                 type: string
 *                 example: Rice
 *               imageUrl:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Menu item created
 *       401:
 *         description: Not authorized, no token provided
 *       403:
 *         description: Access denied, admin only
 */
router.post('/', protect, adminOnly, menuValidation, validateRequest, createMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update a menu item (admin only)
 *     tags: [Menu]
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
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Menu item updated
 *       404:
 *         description: Menu item not found
 */
router.put('/:id', protect, adminOnly, menuValidation, validateRequest, updateMenuItem);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item (admin only)
 *     tags: [Menu]
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
 *         description: Menu item deleted
 *       404:
 *         description: Menu item not found
 */
router.delete('/:id', protect, adminOnly, deleteMenuItem);

module.exports = router;
