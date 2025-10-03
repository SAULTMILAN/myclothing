import React from "react";
import Header from "../components/Header";
import { useCart } from "../pages/CartContext";   // ✅ Cart Context
import { useWishlist } from "../pages/WishlistContext"; // ✅ Wishlist Context
import { FaHeart } from "react-icons/fa"; // ✅ Heart Icon

export default function Signature() {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const products = [
    { id: 1, title: "Royal Velvet Gown", price: 599, img: "/assets/images/Royal_velvet.jpg" },
    { id: 2, title: "Embroidered Sherwani", price: 749, img: "/assets/images/Emb_sherwani.jpg" },
    { id: 3, title: "Gold-Trimmed Saree", price: 499, img: "/assets/images/gold_saree.jpg" },
    { id: 4, title: "Diamond Accent Jewelry", price: 999, img: "/assets/images/diamond_jwl.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 Global Header */}
      <Header />

      {/* 🔹 Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/images/Sig_srs.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="relative text-5xl md:text-6xl font-serif font-bold text-white z-10 drop-shadow-lg">
          The Signature Series
        </h1>
      </section>

      {/* 🔹 Signature Collection */}
      <section className="py-16 px-6 md:px-20 bg-brand-mist flex-1">
        <h2 className="text-3xl font-serif font-bold text-brand-navy text-center">
          Crafted for the Elite
        </h2>
        <p className="text-center mt-2 text-brand-charcoal/80 max-w-2xl mx-auto">
          Our Signature Series combines timeless design, luxury fabrics, and
          unparalleled craftsmanship — curated for those who demand the best.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

      {/* 🔹 Exclusive Invitation */}
      <section className="bg-brand-navy text-brand-ivory py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          An Invitation to Elegance
        </h2>
        <p className="text-lg mb-6">
          Become part of the <span className="text-brand-gold font-bold">Signature Club</span> for early access, exclusive offers, and personalized styling.
        </p>
        <a
          href="/signup"
          className="px-8 py-3 bg-brand-gold text-brand-navy font-semibold rounded-xl2 shadow-luxe hover:bg-brand-ivory hover:text-brand-navy transition"
        >
          Join the Club
        </a>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-brand-navy text-brand-ivory py-8 text-center">
        <p className="text-sm">© 2025 MyClothing. All rights reserved.</p>
      </footer>
    </div>
  );
}
