import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const getProducts = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

export const getProduct = asyncHandler(async (req, res) => {
  const prod = await Product.findById(req.params.id);
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json(prod);
});

export const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, imageUrl, category, inventory } = req.body;
  const prod = await Product.create({ title, description, price, imageUrl, category, inventory });
  res.status(201).json(prod);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const prod = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json(prod);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const prod = await Product.findByIdAndDelete(req.params.id);
  if (!prod) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Deleted" });
});
