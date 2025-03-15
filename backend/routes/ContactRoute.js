import express from "express";
import { submitContactForm, getAllMessages, deleteMessage } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/submit", submitContactForm);  // User submits contact form
router.get("/messages", getAllMessages);   // Admin gets all messages
router.delete("/messages/:id", deleteMessage); // Admin deletes a message

export default router;
