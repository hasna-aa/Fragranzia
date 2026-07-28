require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Routes
const paymentRoutes = require("./routes/payment/paymentRoutes");
const productRoutes = require("./routes/products/productRoutes");
const categoryRoutes = require("./routes/category/categoryRoutes");
const wishlistRoutes = require("./routes/user/wishlistRoutes");
const cartRoutes = require("./routes/user/cartRoutes");
const userRoutes = require("./routes/user/userRoutes");
const addressRoutes = require("./routes/user/addressRoutes");
const orderRoutes = require("./routes/orders/orderRoutes");

// DB
const connectDb = require("./config/db");

connectDb();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// ================= STATIC FILES =================
// VERY IMPORTANT FOR PRODUCT IMAGES
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ================= API ROUTES =================
app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/address", addressRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Fragranzia Server Running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});