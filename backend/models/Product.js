import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: String,
  category: String,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
