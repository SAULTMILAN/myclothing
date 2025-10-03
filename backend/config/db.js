import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) {
    console.warn("⚠️ MONGO_URI not provided. Running without DB.");
    return;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1);
  }
}
