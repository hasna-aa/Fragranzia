const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "Database Connected:",
      connection.connection.name
    );
  } catch (error) {
    console.log("Database Connection Error:", error.message);
  }
};

module.exports = connectDb;

// Admin Dashboard (Products): http://localhost:5173/admin
// Add Product Page: http://localhost:5173/admin/add-product

// Categories Dashboard: http://localhost:5173/admin/categories
// Add a Category: http://localhost:5173/admin/add-category