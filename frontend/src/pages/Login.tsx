import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Simulated user login
    const user = { email };
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ Keys for logged-in user
    const userCartKey = `cart_${email}`;
    const userWishlistKey = `wishlist_${email}`;

    // ✅ Merge guest cart → user cart
    const guestCart = JSON.parse(localStorage.getItem("cart_guest") || "[]");
    const existingCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");
    const mergedCart = [...existingCart];

    guestCart.forEach((guestItem: any) => {
      const found = mergedCart.find((item: any) => item.id === guestItem.id);
      if (found) {
        found.quantity += guestItem.quantity;
      } else {
        mergedCart.push(guestItem);
      }
    });
    localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
    localStorage.removeItem("cart_guest");

    // ✅ Merge guest wishlist → user wishlist
    const guestWishlist = JSON.parse(localStorage.getItem("wishlist_guest") || "[]");
    const existingWishlist = JSON.parse(localStorage.getItem(userWishlistKey) || "[]");
    const mergedWishlist = [
      ...existingWishlist,
      ...guestWishlist.filter(
        (guestItem: any) => !existingWishlist.find((item: any) => item.id === guestItem.id)
      ),
    ];
    localStorage.setItem(userWishlistKey, JSON.stringify(mergedWishlist));
    localStorage.removeItem("wishlist_guest");

    alert("Login Successful 🎉");
    navigate("/"); // redirect to home
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex flex-1 items-center justify-center bg-brand-mist px-6">
        <div className="bg-white shadow-luxe rounded-xl2 p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-brand-navy mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-gold focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-brand-navy text-white rounded-lg hover:bg-brand-gold hover:text-brand-charcoal transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-brand-gold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
