import express from "express";
import { submitContactForm,  getAllContacts } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/submit", submitContactForm);  // User submits contact form
// router.get("/messages", getAllMessages);   // Admin gets all messages
// router.delete("/messages/:id", deleteMessage); // Admin deletes a message
router.get("/getAllContacts", getAllContacts);

export default router;
