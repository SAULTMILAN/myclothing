import React, { useEffect, useState } from "react";
import Header from "../components/Header";

type OrderItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
};

export default function OrderStatus() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* 🔹 Main Section */}
      <section className="py-16 px-6 md:px-20 flex-1 bg-brand-mist">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-navy text-center mb-10">
          Order Status 📦
        </h1>

        {!order ? (
          <p className="text-center text-brand-charcoal">
            No order found. Please place an order first.
          </p>
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-luxe rounded-xl2 p-6">
            {/* Order Header */}
            <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
            <p className="text-brand-charcoal mb-6">
              Current Status:{" "}
              <span className="text-brand-gold font-semibold">
                {order.status || "Processing"}
              </span>
            </p>

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <span>{item.title}</span>
                  <span>
                    ${item.price}.00 × {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <h3 className="text-lg font-bold mt-6">
              Total: ${order.total}.00
            </h3>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-brand-ivory py-6 text-center">
        <p className="text-sm">© 2025 MyClothing. All rights reserved.</p>
      </footer>
    </div>
  );
}
