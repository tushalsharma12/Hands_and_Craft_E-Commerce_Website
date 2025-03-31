import express from "express";
import { submitContactForm,  getAllContacts } from "../controllers/ContactController.js";

const router = express.Router();

router.post("/submit", submitContactForm);  // User submits contact form
// router.delete("/contacts/:id", deleteContact); // Admin deletes a message
router.get("/getAllContacts", getAllContacts);

export default router;
