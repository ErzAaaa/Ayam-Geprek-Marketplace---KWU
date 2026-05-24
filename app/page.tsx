import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden bg-muted/30 pt-24 pb-32">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Pedasnya Nendang, Harganya Tenang!
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
                Rasakan Sensasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
                  Ayam Geprek
                </span> Asli!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0">
                Ayam geprek dengan resep rahasia bumbu nusantara. Digeprek dadakan, pedasnya bisa diatur sesuai selera. Bikin nagih dari gigitan pertama.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Link href="/menu" className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30">
                  Pesan Sekarang <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/menu" className="px-8 py-4 rounded-full font-bold hover:bg-muted transition-colors">
                  Lihat Menu Lengkap
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              {/* Image Placeholder */}
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-amber-500/20 flex items-center justify-center animate-spin-slow">
                 <div className="absolute inset-4 rounded-full border border-primary/20 border-dashed"></div>
                 <div className="text-center text-primary font-bold opacity-50">
                    [Gambar Ayam Geprek Menggoda]
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section placeholder */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Menu Pilihan Merakyat</h2>
               <p className="text-muted-foreground">Paling laris dan selalu jadi incaran!</p>
             </div>
             {/* Product Grid will go here once db schema is known */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
