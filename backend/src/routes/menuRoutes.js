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

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', protect, adminOnly, menuValidation, validateRequest, createMenuItem);
router.put('/:id', protect, adminOnly, menuValidation, validateRequest, updateMenuItem);
router.delete('/:id', protect, adminOnly, deleteMenuItem);

module.exports = router;
