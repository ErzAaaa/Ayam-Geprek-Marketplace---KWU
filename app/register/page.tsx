import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, User, Lock, Mail } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-1/3 -right-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10 py-12">
        <div className="w-full max-w-md">
          <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2">Buat Akun Baru 🔥</h1>
              <p className="text-muted-foreground">Gabung sekarang dan nikmati promo menariknya!</p>
            </div>
            
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Nama Lengkap</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Ayam Geprek Lover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="Minimal 8 karakter"
                  />
                </div>
              </div>
              
              <button
                type="button"
                className="w-full py-4 mt-6 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/25"
              >
                Daftar <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
