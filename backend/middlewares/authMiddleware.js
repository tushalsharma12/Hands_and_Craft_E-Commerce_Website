import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("🚨 No Token Provided"); // ✅ Debugging Log
    return res.status(401).json({ error: "Access Denied, No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Authenticated User:", req.user); // ✅ Debugging Log
    next();
  } catch (error) {
    console.log("🚨 Invalid Token:", error.message); // ✅ Debugging Log
    res.status(401).json({ error: "Invalid Token" });
  }
};