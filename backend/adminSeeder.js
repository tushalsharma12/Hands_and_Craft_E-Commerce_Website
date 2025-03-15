import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";

const createAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            const admin = new User({
                name: "Admin",
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword,
                role: "admin"
            });
            await admin.save();
            console.log("✅ Admin Created Successfully!");
        } else {
            console.log("⚡ Admin Already Exists!");
        }
    } catch (error) {
        console.error("❌ Error creating admin:", error);
    }
};

export default createAdmin;
