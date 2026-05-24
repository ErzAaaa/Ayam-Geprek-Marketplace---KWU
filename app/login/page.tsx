"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Login gagal, periksa kredensial Anda.");
      setLoading(false);
    } else {
      // Fetch session manually to determine role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      
      if (session?.user?.role === "VENDOR" || session?.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-border/50">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black mb-2 text-primary">SIGN IN 👋</h1>
              <p className="text-muted-foreground font-medium">Masuk untuk mulai pesan ayam geprek favoritmu.</p>
            </div>
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 uppercase">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1 uppercase">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                    placeholder="••••••••"
                  />
                </div>
                <div className="text-right">
                  <Link href="#" className="text-xs text-primary font-bold hover:underline">Lupa password?</Link>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-6 bg-primary text-primary-foreground rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-lg"
              >
                {loading ? "Memproses..." : "Masuk Sekarang"} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-muted-foreground font-medium">
              Belum punya akun?{" "}
              <Link href="/register" className="text-primary font-black hover:underline uppercase">Daftar di sini</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
