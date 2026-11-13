const User = require("../../models/user/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters long",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    const escapedEmail = trimmedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const existingUser = await User.findOne({
      email: { $regex: new RegExp(`^${escapedEmail}$`, "i") },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    const jwtSecret = process.env.JWT_SECRET || "fragranzia_secret_key";
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        isAdmin: user.role === "admin" || !!user.isAdmin,
        status: user.status,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }
    res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both email and password",
      });
    }

    const trimmedEmail = email.trim();
    const escapedEmail = trimmedEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${escapedEmail}$`, "i") },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (user.status === false) {
      return res.status(403).json({
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "fragranzia_secret_key";
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        isAdmin: user.role === "admin" || !!user.isAdmin,
        status: user.status,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        phone,
      },
      {
        new: true,
      }
    ).select("-password");

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET ALL USERS (ADMIN) =================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= EXPORTS =================
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
};