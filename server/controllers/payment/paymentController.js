const Razorpay = require("razorpay");

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || "rzp_test_TFJTret5zb9LnV";
  const key_secret = process.env.RAZORPAY_KEY_SECRET || "8UwXzoymUEi7hm1XZKmvUweP";
  return new Razorpay({ key_id, key_secret });
};

// Create Razorpay Order
const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {
    console.error("Payment order error:", error);
    res.status(500).json({ message: error.message || "Payment order failed" });
  }
};

module.exports = {
  createPaymentOrder,
};