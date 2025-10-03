import React, { createContext, useContext, useState, useEffect } from "react";

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
  // ✅ Get current user
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const storageKey = user ? `wishlist_${user.email}` : "wishlist_guest";

  // ✅ Load wishlist from localStorage
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save wishlist to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, storageKey]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev; // prevent duplicates
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => setWishlist([]);

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
