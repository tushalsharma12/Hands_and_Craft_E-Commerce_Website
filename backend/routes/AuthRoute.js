
import express from "express";
import { register, login , getUserProfile, updatePassword,uploadProfilePic, updateUserProfile, getAllUsers , deleteUser} from "../controllers/AuthController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, getUserProfile); // Get user details
router.get("/users", getAllUsers);
// router.put("/profile", authMiddleware, updateUserProfile); // Update user details
router.delete("/delete/:id", authMiddleware, deleteUser);
router.post("/change-password", authMiddleware, updatePassword); // Update user password

// router.get("/profile", getUser); // Get user details
router.post("/upload-profile", authMiddleware, upload.single("profilePic"), uploadProfilePic);

router.put("/update-profile", authMiddleware, upload.single("profilePic"), updateUserProfile);


export default router;
