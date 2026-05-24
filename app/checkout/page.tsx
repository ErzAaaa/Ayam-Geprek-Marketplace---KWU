"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/CartContext";
import { CheckCircle2, Wallet, QrCode, Building, ArrowLeft, UserX, Utensils, Truck } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("CASH");
  const [orderType, setOrderType] = useState<"DINE_IN" | "DELIVERY">("DINE_IN");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Redirect back to cart if empty
    if (items.length === 0 && !isSuccess && status !== "loading") {
      router.replace("/cart");
    }

    // Set current date and time
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(now);
    setCurrentDateTime(formatted);
  }, [items, router, isSuccess, status]);

  const isValid = () => {
    if (orderType === "DINE_IN") {
      const num = parseInt(tableNumber);
      return !isNaN(num) && num >= 1 && num <= 20;
    } else {
      return address.trim().length > 5;
    }
  };

  const handlePayment = () => {
    if (!isValid()) return;
    
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

  // Auth Guard
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-border/50">
            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserX className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black mb-2 uppercase text-foreground">Belum Login</h1>
            <p className="text-muted-foreground mb-8 font-medium">Silakan login terlebih dahulu untuk melanjutkan pembayaran.</p>
            <Link href={`/login?callbackUrl=/checkout`} className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-wide flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
              Login Sekarang
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-xl border border-border/50">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black mb-2 uppercase text-foreground">Pembayaran Berhasil!</h1>
            <p className="text-muted-foreground mb-8 font-medium">Terima kasih atas pesanan Anda. Ayam geprek Anda sedang disiapkan dengan penuh cinta.</p>
            <Link href="/menu" className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-wide flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
              Kembali ke Menu
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Prevent flash of content if cart is empty and redirecting
  if (items.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/cart" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            
            {/* Order Type Section */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-6 uppercase text-foreground border-b pb-4">Tipe Pesanan</h2>
              
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setOrderType("DINE_IN")}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${orderType === 'DINE_IN' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                >
                  <Utensils className="w-8 h-8 mb-2" />
                  <span className="font-bold">Dine In</span>
                </button>
                <button 
                  onClick={() => setOrderType("DELIVERY")}
                  className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-colors ${orderType === 'DELIVERY' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                >
                  <Truck className="w-8 h-8 mb-2" />
                  <span className="font-bold">Delivery</span>
                </button>
              </div>

              {orderType === "DINE_IN" ? (
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Nomor Meja (1-20)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="20"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Masukkan angka 1 - 20"
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase">Alamat Lengkap</label>
                  <textarea 
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukkan alamat pengiriman secara detail"
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium resize-none"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm">
              <h2 className="text-xl font-bold mb-6 uppercase text-foreground border-b pb-4">Metode Pembayaran</h2>
              
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'CASH' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input type="radio" name="payment" value="CASH" checked={paymentMethod === 'CASH'} onChange={() => setPaymentMethod('CASH')} className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Bayar di Tempat (Cash)</div>
                    <div className="text-sm text-muted-foreground">Bayar saat pesanan tiba atau diambil.</div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'QRIS' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input type="radio" name="payment" value="QRIS" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">QRIS</div>
                    <div className="text-sm text-muted-foreground">Gopay, OVO, Dana, LinkAja, ShopeePay.</div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'BANK' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                  <input type="radio" name="payment" value="BANK" checked={paymentMethod === 'BANK'} onChange={() => setPaymentMethod('BANK')} className="w-5 h-5 text-primary focus:ring-primary accent-primary" />
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Transfer Bank (Virtual Account)</div>
                    <div className="text-sm text-muted-foreground">BCA, Mandiri, BNI, BRI.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl p-6 sticky top-24 border shadow-sm">
              <h3 className="text-xl font-bold mb-2 uppercase border-b pb-4">Detail Pesanan</h3>
              <div className="text-sm font-medium text-muted-foreground mb-6">
                Waktu: {currentDateTime || "Memuat waktu..."}
              </div>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div>
                      <div className="font-bold text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.quantity} x Rp {item.price.toLocaleString("id-ID")}</div>
                    </div>
                    <div className="font-bold text-sm shrink-0">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-border border-dashed mb-6" />

              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-muted-foreground font-medium text-sm">
                  <span>Subtotal ({totalItems} item)</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium text-sm">
                  <span>Biaya Layanan</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between font-black text-2xl pt-4 border-t border-border mt-4">
                  <span>Total</span>
                  <span className="text-primary">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing || !isValid()} 
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-lg"
              >
                {isProcessing ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
