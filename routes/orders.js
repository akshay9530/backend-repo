const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  createOrder,
  getOrder,
  getOrderByNumber,
  getUserOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getAllOrders,
  cancelOrder
} = require('../controllers/orderController');

// Public routes (for guest checkout)
router.post('/', createOrder);
router.get('/order-number/:orderNumber', getOrderByNumber);

// Protected routes
router.get('/user/:userId', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/cancel', protect, cancelOrder);

// Admin routes
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);
router.put('/:id/payment', protect, admin, updatePaymentStatus);

module.exports = router;