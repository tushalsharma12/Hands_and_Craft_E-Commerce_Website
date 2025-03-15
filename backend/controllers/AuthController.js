import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  const { name, email, password} = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Validate password
  // if (password.length < 6) {
  //   return res.status(400).json({ error: "Password must be at least 6 characters" });
  // }

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json({ error: "Email already exists" });

  // const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password, role : "user" });

  await user.save();
  res.status(201).json({ message: "User registered successfully",user: user });
};



export const login = async (req, res) => {
  try {
  const { email, password } = req.body;

  // Step 1: Check if email matches the predefined admin email
  if (email === process.env.ADMIN_EMAIL) {
    // Hash admin password on first deployment and store it in env
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

    // Generate JWT token for admin
    const token = jwt.sign({ userId: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token, user:{ ...adminUser, password: undefined} });
  }

  // Step 2: Normal User Login
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "User not found" });

  if (password !== user.password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, user });
} catch (error) {
  res.status(500).json({ error: "Server error during login" });
}

};



// export const getUser = async (req, res) => {
//     try {
//         const token = req.header("Authorization");
//         if (!token) return res.status(401).json({ message: "Unauthorized" });

//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(verified.id).select("-password");

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Invalid Token" });
//     }
// }