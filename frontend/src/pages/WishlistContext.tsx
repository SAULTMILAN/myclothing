import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  img: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // ✅ Fetch wishlist from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/wishlist", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setWishlist(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToWishlist = async (item: WishlistItem) => {
    try {
      const res = await axios.post("http://localhost:5000/api/wishlist/add", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (id: number) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/wishlist/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setWishlist(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete("http://localhost:5000/api/wishlist/clear", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setWishlist([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
};
