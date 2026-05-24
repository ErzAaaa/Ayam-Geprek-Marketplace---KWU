"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export function Header() {
  const { totalItems } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-3xl font-black tracking-tighter text-primary italic">
            AG<span className="text-foreground text-xl not-italic ml-1 font-bold">JAGONYA AYAM</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-black uppercase tracking-wide text-sm text-foreground">
          <Link href="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <Link href="/promo" className="hover:text-primary transition-colors">Promo</Link>
          <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </nav>
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
              {totalItems}
            </span>
          </Link>
          <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
