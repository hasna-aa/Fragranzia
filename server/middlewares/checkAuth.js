const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No Token" });
    }

    // 🔥 FIX: remove "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No Token" });
    }

    const jwtSecret = process.env.JWT_SECRET || "fragranzia_secret_key";
    const decoded = jwt.verify(token, jwtSecret);

    // 🔥 IMPORTANT: your JWT uses { _id: user._id }
    req.userId = decoded._id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized" });
  }
};

module.exports = checkAuth;