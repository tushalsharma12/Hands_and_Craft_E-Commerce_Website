import express from "express";
import {
  order,
  getUserOrders,
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/OrderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // Ensure user is logged in

const router = express.Router();

router.post("/add", authMiddleware, order);
router.get("/user", authMiddleware, getUserOrders);
router.get("/", authMiddleware, getAllOrders);
router.put("/:orderId", authMiddleware, updateOrderStatus);
router.delete("/delete/:id", authMiddleware, deleteOrder);
router.put("/:id/status", authMiddleware, updateOrderStatus);

export default router;
