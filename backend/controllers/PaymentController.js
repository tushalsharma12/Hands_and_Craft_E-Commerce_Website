import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import mongoose from "mongoose";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
    console.log("🔍 Received payment request:", req.body);
    
    try {
        const { amount } = req.body;
        const userId = req.user.userId;

        console.log("👤 Creating payment for user:", userId);
        console.log("💰 Amount:", amount);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format. Expected a valid MongoDB ObjectId." });
          }

        if (!amount || amount <= 0) {
            console.log("❌ Invalid amount:", amount);
            return res.status(400).json({ error: "Valid amount is required" });
        }

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: "inr",
            metadata: { userId }
        });

        console.log("✅ Stripe payment intent created:", paymentIntent.id);

        // Create payment record
        const payment = new Payment({
            userId: new mongoose.Types.ObjectId(userId), 
            amount: amount / 100,
            paymentIntentId: paymentIntent.id,
            status: "pending"
        });

        await payment.save();
        console.log("✅ Payment record saved to database:", payment._id);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentId: payment._id
        });

    } catch (error) {
        console.error("❌ Payment Error:", error);
        res.status(500).json({ error: error.message });
    }
};

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId, status } = req.body;
        
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        payment.status = status;
        await payment.save();

        res.json({ message: "Payment status updated" });
    } catch (error) {
        console.error("Update Payment Status Error:", error);
        res.status(500).json({ error: "Failed to update payment status" });
    }
};