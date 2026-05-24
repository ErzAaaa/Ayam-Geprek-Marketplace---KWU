import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
            Ayam Geprek Merakyat
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          <Link href="/login" className="px-4 py-2 text-sm font-semibold border border-border rounded-full hover:bg-muted transition-colors">
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}
