import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type CartItem = {
  id: number;
  title: string;
  price: number;
  img: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Fetch cart from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/cart")
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCart(res.data); // update with backend response
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setCart([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
