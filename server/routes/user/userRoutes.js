const express = require("express");
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
} = require("../../controllers/user/userController");

// Middleware
const checkAuth = require("../../middlewares/checkAuth");

// Other Controllers
const { addToWishlist } = require("../../controllers/user/wishlistController");
const { addToCart, getCart } = require("../../controllers/user/cartController");

// ================= AUTH =================
router.post("/register", registerUser);
router.post("/login", loginUser);

// ================= PROFILE =================
// Logged-in user profile
router.get("/profile", checkAuth, getProfile);
router.put("/profile", checkAuth, updateProfile);

// ================= ADMIN USERS =================
// Get all users for admin dashboard
router.get("/all", getAllUsers);

// ================= CART =================
router.post("/cart", addToCart);
router.get("/cart", getCart);

// ================= WISHLIST =================
router.post("/addwish", addToWishlist);

module.exports = router;