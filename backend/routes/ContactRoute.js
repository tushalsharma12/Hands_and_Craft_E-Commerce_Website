import express from "express";
import {
  submitContactForm,
  getAllContacts,
} from "../controllers/ContactController.js";

const router = express.Router();

router.post("/submit", submitContactForm); 
router.get("/getAllContacts", getAllContacts);

export default router;
