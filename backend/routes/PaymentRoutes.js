// import express from "express";
// const router = express.Router();
// import { CreatePayment ,SavePayment } from "../controllers/PaymentController.js";

// // Payment Intent API
// router.post("/create-payment-intent", CreatePayment);
// router.post("/save-payment", SavePayment);

// export default router;

import express from "express";
import { createPaymentIntent , updatePaymentStatus} from "../controllers/PaymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Make sure route matches the frontend URL
router.post("/create-payment-intent", authMiddleware, createPaymentIntent);
router.post("/update-status", authMiddleware, updatePaymentStatus);

export default router;
