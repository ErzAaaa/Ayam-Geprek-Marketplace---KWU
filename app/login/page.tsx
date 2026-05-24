import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2">Selamat Datang! 👋</h1>
              <p className="text-muted-foreground">Masuk untuk mulai pesan ayam geprek favoritmu.</p>
            </div>
            
            <form className="space-y-5" action="/api/auth/callback/credentials" method="POST">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
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
                    name="password"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div className="text-right">
                  <Link href="#" className="text-xs text-primary font-medium hover:underline">Lupa password?</Link>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 mt-6 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all shadow-lg shadow-primary/25"
              >
                Masuk Sekarang <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">Daftar di sini</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
