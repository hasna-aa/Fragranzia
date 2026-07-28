const Order = require("../../models/orders/order");

// ================= CREATE ORDER =================
const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;

    const order = await Order.create({
      userId,
      ...req.body,
    });

    res.status(201).json(order);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET USER ORDERS =================
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId;

    const orders = await Order.find({ userId })
      .populate("items.product")
      .populate("addressId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL ORDERS (ADMIN) =================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.product")
      .populate("addressId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE ORDER STATUS =================
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET SINGLE ORDER =================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("items.product")
      .populate("addressId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= EXPORT =================
module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};