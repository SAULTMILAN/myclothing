import express from "express";
import { addToWishlist, getWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/wishlist/add
 * @desc    Add item to wishlist (guest → localStorage, user → DB)
 * @access  Public (guest), Private (user with token)
 */
router.post("/add", addToWishlist);

/**
 * @route   GET /api/wishlist
 * @desc    Get wishlist (only for logged-in users)
 * @access  Private
 */
router.get("/", protect, getWishlist);

export default router;
