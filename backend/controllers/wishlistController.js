// controllers/wishlistController.js
import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (req, res) => {
  try {
    const { id, title, price, img } = req.body;

    if (!req.user) {
      // guest users handled in frontend localStorage
      return res.json({ message: "Guest wishlist handled on frontend" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    const exists = wishlist.items.find((item) => item.id === id);
    if (!exists) {
      wishlist.items.push({ id, title, price, img });
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    res.json(wishlist || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
