import React from "react";
import Header from "../components/Header";
import { useCart } from "../pages/CartContext";   // ✅ Cart Context
import { useWishlist } from "../pages/WishlistContext"; // ✅ Wishlist Context
import { FaHeart } from "react-icons/fa"; // ✅ Heart Icon

export default function Accessories() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const products = [
    { id: 13, title: "Leather Belt", price: 39, img: "https://picsum.photos/id/213/400/400" },
    { id: 14, title: "Stylish Sunglasses", price: 49, img: "https://picsum.photos/id/214/400/400" },
    { id: 15, title: "Designer Handbag", price: 129, img: "https://picsum.photos/id/215/400/400" },
    { id: 16, title: "Silk Scarf", price: 59, img: "https://picsum.photos/id/216/400/400" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 🔹 Hero Section */}
      <section className="py-20 bg-white text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy">
          Accessories
        </h1>
        <p className="mt-4 text-gray-600">
          Complete your look with stylish accessories.
        </p>
      </section>

      {/* 🔹 Product Grid */}
      <section className="py-16 px-6 md:px-20 bg-brand-mist flex-1">
        <h2 className="text-3xl font-bold text-center text-brand-navy mb-10">
          Must-Have Accessories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl2 shadow-luxe overflow-hidden hover:scale-105 transition"
            >
              {/* Product Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover"
              />

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-brand-gold font-bold mt-2">${item.price}.00</p>

                {/* ✅ Buttons Row */}
                <div className="flex justify-center gap-3 mt-4">
                  {/* 🛒 Add to Cart */}
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 py-2 px-4 rounded-lg bg-brand-navy text-white hover:bg-brand-gold hover:text-brand-charcoal transition"
                  >
                    Add to Cart
                  </button>

                  {/* ❤️ Add to Wishlist */}
                  <button
                    onClick={() => addToWishlist(item)}
                    className="px-4 py-2 rounded-lg border border-brand-gold text-brand-navy hover:bg-brand-gold hover:text-white transition"
                  >
                    <FaHeart className="text-pink-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-brand-navy text-brand-ivory py-8 text-center">
        <p className="text-sm">© 2025 MyClothing. All rights reserved.</p>
      </footer>
    </div>
  );
}
