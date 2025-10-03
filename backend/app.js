import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
await connectDB(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 API running at http://localhost:${PORT}`));
