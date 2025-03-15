import mongoose from "mongoose";
import dotenv from "dotenv";
import express from 'express';

const app = express();

import cors from "cors";
import path from "path";
import ProductRoute from "./routes/ProductRoute.js";
import ContactRoute from "./routes/ContactRoute.js";
import AutRoute from "./routes/AuthRoute.js";
import CartRoute from "./routes/CartRoute.js";
import Payment from "./routes/PaymentRoutes.js";
import OrderRoute from "./routes/OrderRoute.js";
// import Product2Route from "./routes/Product2Route.js";
// import { fileURLToPath } from "url";
// app.use(express.static(path.join(path.resolve(), "public")));
//public static
// app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));


dotenv.config();

app.use(express.json());
app.use(cors());
app.use( "/api/products",ProductRoute);
app.use( "/api/contact",ContactRoute);
app.use('/api/auth', AutRoute);
app.use( "/api/cart",CartRoute);
app.use("/api/payment", Payment);
app.use("/api/order", OrderRoute);

// app.use( "/api/products3/products3",ProductRoute);


// app.use( "/api/products2",Product2Route);





mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));


app.get('/', (req, res) => {
  res.send('Hello, Express.js Server is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

