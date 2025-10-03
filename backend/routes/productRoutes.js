import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

// fallback data if DB not connected
const sample = [
  { _id: "s1", title: "Royal Dress", price: 149.99, imageUrl: "", category: "Women" },
  { _id: "s2", title: "Gold Bracelet", price: 89.0, imageUrl: "", category: "Jewelry" }
];

router.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Product.find({}).sort({ createdAt: -1 });
      return res.json(items);
    }
    return res.json(sample);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
