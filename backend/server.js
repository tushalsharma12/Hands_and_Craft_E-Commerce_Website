import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import ProductRoute from "./routes/ProductRoute.js";
import ContactRoute from "./routes/ContactRoute.js";
import AutRoute from "./routes/AuthRoute.js";
import CartRoute from "./routes/CartRoute.js";
import Payment from "./routes/PaymentRoutes.js";
import OrderRoute from "./routes/OrderRoute.js";


app.use("/uploads", express.static("uploads"));

dotenv.config();

app.use(express.json());
app.use(cors({origin: '*'}));
app.use("/api/products", ProductRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/auth", AutRoute);
app.use("/api/cart", CartRoute);
app.use("/api/payment", Payment);
app.use("/api/order", OrderRoute);

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

app.get("/", (req, res) => {
  res.send("Hello, Express.js Server is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
