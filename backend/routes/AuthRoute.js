
import express from "express";
import { register, login } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/profile", getUser); // Get user details


export default router;
