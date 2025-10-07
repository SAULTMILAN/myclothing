import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { id, title, price, img } = req.body;
    const userId = req.user.id; // comes from protect middleware (decoded JWT)

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ id, title, price, img, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("user", "email");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
