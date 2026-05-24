import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Store, ShoppingBag, UtensilsCrossed, LogOut, LayoutDashboard } from "lucide-react";
import { SignOutButton } from "@/components/SignOutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role === "BUYER") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6 border-b border-zinc-100 flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg text-white">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-none">SELLER</h1>
            <p className="text-xs text-muted-foreground font-medium">Dashboard Area</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-zinc-600 hover:text-orange-600 font-bold transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Overview
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-zinc-600 hover:text-orange-600 font-bold transition-colors">
            <ShoppingBag className="w-5 h-5" /> Pesanan
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-zinc-600 hover:text-orange-600 font-bold transition-colors">
            <UtensilsCrossed className="w-5 h-5" /> Daftar Menu
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 bg-zinc-50 min-h-screen">
        {/* Mobile Header */}
        <header className="bg-white border-b border-zinc-200 p-4 flex items-center justify-between md:hidden sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-orange-500" />
            <span className="font-black">SELLER DASHBOARD</span>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
