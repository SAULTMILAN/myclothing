import express from "express";
import { addToCart, getCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Save item to MongoDB
router.post("/add", protect, addToCart);

// ✅ Get user’s cart
router.get("/", protect, getCart);

export default router;
