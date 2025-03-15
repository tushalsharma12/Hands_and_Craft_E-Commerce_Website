import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/CartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);


export default router;