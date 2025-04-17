import express from "express";
import {
  createPaymentIntent,
  updatePaymentStatus,
} from "../controllers/PaymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.post("/update-status", authMiddleware, updatePaymentStatus);

export default router;
