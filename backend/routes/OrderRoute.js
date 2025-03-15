import express from "express";
import { order, getUserOrders, updateOrderStatus, deleteOrder, getAllOrders } from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Ensure user is logged in

const router = express.Router();

router.post("/add", authMiddleware, order);
router.get("/user", authMiddleware, getUserOrders);
// ✅ Admin order management routes
router.get("/", authMiddleware, getAllOrders);
router.put("/:orderId", authMiddleware, updateOrderStatus);
router.delete("/:orderId", authMiddleware, deleteOrder);

export default router;
