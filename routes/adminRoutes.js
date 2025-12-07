const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats
} = require('../controllers/adminController');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const {
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus
} = require('../controllers/orderController');

// Admin dashboard
router.route('/stats').get(protect, admin, getDashboardStats);

// User management
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Category management (using existing controllers with admin middleware)
router.route('/categories')
  .get(protect, admin, getCategories)
  .post(protect, admin, createCategory);

router.route('/categories/:id')
  .get(protect, admin, getCategory)
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

// Product management
router.route('/products')
  .get(protect, admin, getProducts)
  .post(protect, admin, createProduct);

router.route('/products/:id')
  .get(protect, admin, getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Order management
router.route('/orders').get(protect, admin, getAllOrders);
router.route('/orders/:id').get(protect, admin, getOrder);
router.route('/orders/:id/status').put(protect, admin, updateOrderStatus);
router.route('/orders/:id/payment').put(protect, admin, updatePaymentStatus);

module.exports = router;