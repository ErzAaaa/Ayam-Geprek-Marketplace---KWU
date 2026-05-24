"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ArrowRight, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tight">Keranjang Belanja</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-dashed border-2">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Keranjang masih kosong</h2>
                <p className="text-muted-foreground mb-8">Wah, belum ada pesanan nih. Yuk pilih ayam geprek favoritmu sekarang!</p>
                <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg">
                  Pesan Sekarang
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between border shadow-sm gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-primary font-black">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-muted rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-black text-lg min-w-[100px] text-right">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-destructive/10"
                        title="Hapus"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl p-6 sticky top-24 border shadow-sm">
              <h3 className="text-xl font-bold mb-6 uppercase">Ringkasan Belanja</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Total Harga ({totalItems} barang)</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Diskon Promo</span>
                  <span className="text-green-600">-</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-black text-2xl">
                  <span>Total</span>
                  <span className="text-primary">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={items.length === 0} 
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-lg"
              >
                Lanjutkan ke Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
