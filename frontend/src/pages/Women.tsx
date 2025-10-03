import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Women() {
  const categories = [
    { title: "Casual Wear", image: "/assets/images/Casualwear.jpg", link: "/women/casual" },
    { title: "Evening Gowns", image: "/assets/images/Evening_Gowns.jpg", link: "/women/evening" },
    { title: "Jewelry & Accessories", image: "/assets/images/JewelryA.jpg", link: "/women/jewelry" },
    { title: "Bridal Collection", image: "/assets/images/Bridal_collection_converted.jpg", link: "/women/bridal" },
    { title: "Signature Series", image: "/assets/images/Signature_Series.jpg", link: "/signature" },
    { title: "Luxury Sarees", image: "/assets/images/Luxury_sarees_c.jpg", link: "/women/sarees" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 Global Header */}
      <Header />

      {/* 🔹 Hero Section */}
      <section className="py-20 text-center bg-gradient-to-b from-brand-mist to-white">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-navy mb-6">
          Women’s Royal Collection
        </h1>
        <p className="text-lg text-brand-charcoal/80 max-w-2xl mx-auto">
          Discover elegant styles, from everyday essentials to timeless couture.
        </p>
      </section>

      {/* 🔹 Featured Categories */}
      <section className="px-6 md:px-20 py-16">
        <h2 className="text-3xl font-bold text-center text-brand-navy mb-10">
          Explore Our Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <Link
                  to={item.link}
                  className="inline-block px-6 py-2 rounded-lg border border-brand-gold text-brand-navy font-medium hover:bg-brand-gold hover:text-white transition"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 CTA Section */}
      <section className="bg-brand-navy text-brand-ivory py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Royalty Awaits You
        </h2>
        <p className="text-lg mb-6">
          Sign up today and receive{" "}
          <span className="text-brand-gold font-bold">20% off</span> your first order.
        </p>
        <Link
          to="/signup"
          className="px-8 py-3 bg-brand-gold text-brand-navy font-semibold rounded-xl2 shadow-luxe hover:bg-brand-ivory hover:text-brand-navy transition"
        >
          Join Now
        </Link>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-brand-navy text-brand-ivory py-8 text-center">
        <p className="text-sm">© 2025 MyClothing. All rights reserved.</p>
      </footer>
    </div>
  );
}
