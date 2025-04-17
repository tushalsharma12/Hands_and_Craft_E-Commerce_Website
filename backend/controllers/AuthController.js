import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ^ = start of the string, $ = end of the string , \s = whitespace, @ = at symbol
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  // Validate password
  // if (password.length < 6) {
  //   return res.status(400).json({ error: "Password must be at least 6 characters" });
  // }
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ error: "Email already exists" });
  // const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password, role: "user" });
  await user.save();
  res.status(201).json({ message: "User registered successfully", user: user });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Step 1: Check if email matches the predefined admin email
    if (email === process.env.ADMIN_EMAIL) {
      const isAdminMatch = password === process.env.ADMIN_PASSWORD;
      if (!isAdminMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      // Create admin user data
      const adminUser = {
        _id: "admin_id_123", // Fake ID for admin
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        role: "admin",
      };
      const token = jwt.sign(
        // Generate JWT token for admin
        { userId: adminUser._id, role: adminUser.role },
        process.env.JWT_SECRET
      );
      return res.json({ token, user: { ...adminUser, password: undefined } });
    }

    // Step 2: Normal User Login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId || req.user.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
        ? `http://localhost:5000${user.profilePicture}`
        : null,
      role: user.role,
      // createdAt: user.createdAt,
      // updatedAt: user.updatedAt,
      createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
      updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean().sort({ updatedAt: -1 }); // Convert to plain object

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Order.find({ userId: user._id });

        return {
          ...user,
          profilePicture: user.profilePicture
            ? `http://localhost:5000${user.profilePicture}`
            : "/backend/uploads/1741196388847-tushal link.jpg",
          orderCount: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
          lastOrderDate: orders.length
            ? new Date(orders[orders.length - 1].createdAt).toISOString()
            : null,
        };
      })
    );

    res.json(usersWithOrders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Admin check karein
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Access denied. Only admin can delete users." });
    }
    // ✅ User exist karta hai ya nahi?
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // ✅ Pehle orders ko handle karein
    await Order.deleteMany({ userId: id });
    await Cart.deleteMany({ userId: id });
    // ✅ User ko delete karein
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find user by ID
    const user = await User.findById(req.user.userId || req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ Directly compare passwords without hashing
    if (oldPassword !== user.password) {
      return res.status(400).json({ error: "Invalid old password" });
    }
    // ✅ Directly update new password (NO HASHING)
    user.password = newPassword;

    await user.save();

    res.json({ message: "Password updated successfully without hashing" });
  } catch (error) {
    console.error("🔥 Error updating password:", error);
    res.status(500).json({ error: "Server error during password update" });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findById(req.user.userId || req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save relative path in database
    const profilePath = `/uploads/${req.file.filename}`;
    user.profilePicture = profilePath;
    await user.save();

    // Return full URL in response
    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully!",
      profilePicUrl: `http://localhost:5000${profilePath}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Profile picture upload failed" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.userId || req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (name) user.name = name; // ✅ Name update ho raha hai
    if (req.file) {
      user.profilePicture = `/uploads/${req.file.filename}`;
    }

    await user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePicUrl: `http://localhost:5000${user.profilePicture}`,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Profile update failed" });
  }
};
