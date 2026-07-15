const Menu = require('../models/Menu');

// GET /api/menu - public, supports search & filter
const getAllMenuItems = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const menuItems = await Menu.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: menuItems.length, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/menu/:id - public
const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/menu - admin only
const createMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.create(req.body);
    res.status(201).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/menu/:id - admin only
const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/menu/:id - admin only
const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
