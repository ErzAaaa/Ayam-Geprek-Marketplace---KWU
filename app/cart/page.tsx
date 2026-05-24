import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black mb-8">Keranjang Belanja</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            {/* Empty Cart State */}
            <div className="glass rounded-2xl p-12 text-center border-dashed border-2">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Keranjang masih kosong</h2>
              <p className="text-muted-foreground mb-8">Wah, belum ada pesanan nih. Yuk pilih ayam geprek favoritmu sekarang!</p>
              <Link href="/menu" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                Pesan Sekarang
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Ringkasan Belanja</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Harga (0 barang)</span>
                  <span>Rp 0</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Diskon Promo</span>
                  <span>-</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between font-black text-xl">
                  <span>Total Belanja</span>
                  <span className="text-primary">Rp 0</span>
                </div>
              </div>

              <button disabled className="w-full py-4 bg-primary/50 text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                Beli (0) <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
