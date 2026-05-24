import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Flame, Percent } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 w-full bg-black">
        {/* Poster 1: PROMO RAKYAT BESAR-BESARAN */}
        <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden border-b-8 border-primary">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-orange-500 opacity-90 mix-blend-multiply"></div>
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-black tracking-widest text-sm mb-8 animate-pulse">
              <Percent className="w-5 h-5" /> PROMO BULAN INI
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-6 leading-none drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600">DISKON</span> GILA
              <br />
              S.D <span className="text-white">50%</span>
            </h1>
            <p className="text-2xl md:text-4xl font-bold text-white/90 mb-12 max-w-4xl mx-auto drop-shadow-md">
              PAKET RAKYAT MAKIN BERSAHABAT! KENYANG PERUTNYA, TENANG DOMPETNYA.
            </p>
            <Link href="/promo" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-primary rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              AMBIL PROMO <ArrowRight className="w-8 h-8" />
            </Link>
          </div>
        </section>

        {/* Poster 2: MENU PENJELASAN */}
        <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-zinc-950">
          {/* Abstract background shapes */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-600/30 rounded-full blur-[150px] -z-10 -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 text-left text-white">
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-black tracking-widest text-sm mb-8">
                  <Flame className="w-5 h-5" /> REKOMENDASI CHEF
                </div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[1.1]">
                  AYAM GEPREK <span className="text-primary">SAMBAL BAWANG</span> MERCON
                </h2>
                <div className="space-y-6 text-xl text-zinc-400 font-medium mb-12 max-w-2xl">
                  <p>
                    <strong className="text-white">100% Daging Ayam Pilihan:</strong> Digoreng dadakan dengan tepung bumbu rahasia yang super krispi di luar, namun tetap *juicy* di dalam.
                  </p>
                  <p>
                    <strong className="text-white">Sambal Uleg Fresh:</strong> Cabai setan pilihan yang diuleg langsung dengan bawang putih segar, disiram minyak panas yang menggugah selera!
                  </p>
                </div>
                <Link href="/menu" className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white rounded-full font-black text-xl hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                  LIHAT SEMUA MENU <ArrowRight className="w-6 h-6" />
                </Link>
              </div>
              
              <div className="flex-1 w-full max-w-2xl">
                {/* Visual Placeholder for Menu Poster */}
                <div className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-zinc-800 to-zinc-900 border-4 border-zinc-800 shadow-2xl overflow-hidden flex items-center justify-center p-12">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-48 h-48 mx-auto bg-primary rounded-full blur-[80px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                    <Flame className="w-32 h-32 text-orange-500 mx-auto mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                    <h3 className="text-4xl font-black text-white relative z-10 uppercase tracking-widest">
                      Spicy &<br/>Crunchy
                    </h3>
                  </div>
               </div>
             </div>
           </div>
          </div>
        </section>

        {/* Floating Order Button */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
          <Link href="/menu" className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-muted hover:scale-110 transition-transform">
             <span className="text-2xl">🍗</span>
          </Link>
          <Link href="/menu" className="px-6 py-2 bg-primary text-primary-foreground font-black uppercase rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm tracking-wide">
            Order Now!
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
