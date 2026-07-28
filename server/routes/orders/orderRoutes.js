const express = require("express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById
} = require("../../controllers/orders/orderController");

const checkAuth = require("../../middlewares/checkAuth");

const router = express.Router();

// Create new order
router.post("/", checkAuth, createOrder);

// Get user orders
router.get("/my-orders", checkAuth, getUserOrders);

// Get all orders (admin)
router.get("/", checkAuth, getAllOrders);

// Update order status
router.put("/:id", checkAuth, updateOrderStatus);

router.get("/:id", checkAuth, getOrderById);

module.exports = router;