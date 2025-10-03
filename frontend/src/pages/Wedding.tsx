import React from "react";
import Header from "../components/Header";
import { useCart } from "../pages/CartContext";   // ✅ Cart Context
import { useWishlist } from "../pages/WishlistContext"; // ✅ Wishlist Context
import { FaHeart } from "react-icons/fa"; // ✅ Heart Icon

export default function Wedding() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const products = [
    { id: 1, title: "Bridal Gown", price: 299, img: "/assets/images/Bridal_gown.jpg" },
    { id: 2, title: "Sherwani", price: 349, img: "/assets/images/men_sherwani.jpg" },
    { id: 3, title: "Bridal Jewelry", price: 199, img: "/assets/images/Bridal_jewelry.jpg" },
    { id: 4, title: "Couple Set", price: 499, img: "/assets/images/Wedding_couple.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 🔹 Hero Section */}
      <section className="py-16 text-center bg-gradient-to-b from-brand-mist to-white">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-navy mb-6">
          Timeless Elegance for Your Big Day
        </h1>
        <p className="text-lg text-brand-charcoal/80 max-w-2xl mx-auto">
          Discover bridal gowns, sherwanis, jewelry, and accessories crafted with luxury.
        </p>
      </section>

      {/* 🔹 Product Grid */}
      <section className="px-6 md:px-20 py-16 bg-brand-mist flex-1">
        <h2 className="text-3xl font-bold text-center text-brand-navy mb-10">
          Wedding Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl2 shadow-luxe overflow-hidden hover:scale-105 transition"
            >
              <img src={item.img} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-brand-gold font-bold mt-2">${item.price}.00</p>

                {/* ✅ Buttons Row */}
                <div className="flex gap-3 mt-4">
                  {/* 🛒 Add to Cart */}
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 py-2 rounded-lg bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-charcoal transition"
                  >
                    Add to Cart
                  </button>

                  {/* ❤️ Add to Wishlist */}
                  <button
                    onClick={() => addToWishlist(item)}
                    className="p-2 rounded-full border border-brand-gold hover:bg-brand-gold hover:text-white transition"
                  >
                    <FaHeart className="text-pink-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-brand-navy text-brand-ivory py-8 text-center">
        <p className="text-sm">© 2025 MyClothing. All rights reserved.</p>
      </footer>
    </div>
  );
}
