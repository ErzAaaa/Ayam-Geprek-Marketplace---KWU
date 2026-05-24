"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, LogOut, LayoutDashboard, User } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { useSession, signOut } from "next-auth/react";

function getInitials(name: string) {
  if (!name) return "U";
  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

const colors = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", 
  "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500"
];

function getColorForName(name: string) {
  if (!name) return colors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function Header() {
  const { totalItems } = useCart();
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.user as any;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo Usaha" className="h-10 w-auto" />
            <span className="text-foreground text-xl font-bold tracking-tight">JAGOAN RAKYAT</span>
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
          
          {status === "loading" ? (
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div>
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold tracking-wider hover:ring-2 ring-primary/50 transition-all ${getColorForName(user?.name || user?.email || "User")}`}
              >
                {getInitials(user?.name || user?.email || "User")}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-zinc-100 mb-1">
                    <p className="text-sm font-bold text-zinc-800 truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                  </div>
                  
                  {user?.role === "VENDOR" || user?.role === "ADMIN" ? (
                    <Link 
                      href="/admin/dashboard" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                  ) : null}
                  
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      signOut();
                    }} 
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
