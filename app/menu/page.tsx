"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const CATEGORIES = ["PROMOTION", "PAKET RAKYAT", "CHICKEN", "DRINKS"];

const MOCK_PRODUCTS = [
  { id: "1", category: "PAKET RAKYAT", name: "Menu Rakyat 1", description: "1 Pcs Chicken + 1 Pcs Rice", price: 15000, imageUrl: null },
  { id: "2", category: "PAKET RAKYAT", name: "Menu Rakyat 2", description: "2 Pcs Chicken + 1 Pcs Rice + 1 Drink", price: 25000, imageUrl: null },
  { id: "3", category: "PAKET RAKYAT", name: "Menu Rakyat 3", description: "3 Pcs Chicken + 2 Pcs Rice + 2 Drink", price: 40000, originalPrice: 50000, imageUrl: null },
  { id: "4", category: "DRINKS", name: "Air Mineral", description: "Air mineral botol 600ml", price: 5000, imageUrl: null },
  { id: "5", category: "DRINKS", name: "Es Teh Manis", description: "Es teh manis segar", price: 6000, imageUrl: null },
  { id: "6", category: "PROMOTION", name: "Promo Rakyat Berdua", description: "2 Pcs Chicken + 2 Pcs Rice + 2 Es Teh", price: 30000, originalPrice: 45000, imageUrl: null },
  { id: "7", category: "CHICKEN", name: "Ayam Geprek Dada", description: "1 Pcs Dada Ayam Geprek", price: 12000, imageUrl: null },
  { id: "8", category: "CHICKEN", name: "Ayam Geprek Paha Atas", description: "1 Pcs Paha Atas Ayam Geprek", price: 12000, imageUrl: null },
  { id: "9", category: "CHICKEN", name: "Ayam Geprek Paha Bawah", description: "1 Pcs Paha Bawah Ayam Geprek", price: 10000, imageUrl: null },
  { id: "10", category: "CHICKEN", name: "Ayam Geprek Sayap", description: "1 Pcs Sayap Ayam Geprek", price: 10000, imageUrl: null },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("PAKET RAKYAT");

  const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Header />

      {/* Category Tabs */}
      <div className="bg-white border-b border-border shadow-sm sticky top-20 z-40">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 min-w-max py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-black uppercase tracking-wider text-sm transition-colors ${
                  activeCategory === cat ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8 text-foreground">{activeCategory}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
