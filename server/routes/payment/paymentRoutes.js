const express = require("express");
const router = express.Router();

const { createPaymentOrder } = require("../../controllers/payment/paymentController");

// checkAuth venda ippol
router.post("/create-order", createPaymentOrder);

module.exports = router;