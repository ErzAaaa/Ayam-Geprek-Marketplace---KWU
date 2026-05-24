"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";

const PROMO_PRODUCTS = [
  { id: "3", name: "Menu Rakyat 3", description: "3 Pcs Chicken + 2 Pcs Rice + 2 Drink", price: 40000, originalPrice: 50000, imageUrl: "/images/menu-rakyat-3.jpg" },
  { id: "6", name: "Promo Rakyat Berdua", description: "2 Pcs Chicken + 2 Pcs Rice + 2 Es Teh", price: 30000, originalPrice: 45000, imageUrl: "/images/promo-rakyat-berdua.jpg" },
  { id: "7", name: "Super Besar 1", description: "1 Pcs Chicken + 1 Rice + Cola", price: 20000, originalPrice: 28000, imageUrl: "/images/super-besar-1.jpg" },
  { id: "8", name: "Family Bucket", description: "9 Pcs Chicken", price: 99000, originalPrice: 120000, imageUrl: "/images/family-bucket.jpg" },
];

export default function PromoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-foreground">PROMOTION</h1>
        <p className="text-lg text-muted-foreground mb-12 font-medium">Spesial diskon merakyat hari ini! Langsung masukkan ke keranjang.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PROMO_PRODUCTS.map((product) => (
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
