import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  vendorShopName?: string;
}

export function ProductCard({ id, name, description, price, imageUrl, vendorShopName }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50",
      "hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
    )}>
      {/* Image Area */}
      <div className="relative aspect-square w-full bg-muted/30 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
           // Note: in a real app, use next/image with proper domain configured
           <img src={imageUrl} alt={name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
        ) : (
           <div className="text-muted-foreground/50 font-medium text-sm">No Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <button className="w-full py-2 bg-primary text-primary-foreground rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-95 transition-all">
             <ShoppingCart className="w-4 h-4" /> Tambah
           </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {vendorShopName && (
          <div className="text-xs text-primary font-semibold tracking-wider uppercase mb-1">{vendorShopName}</div>
        )}
        <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {description || "Ayam geprek nikmat dengan sambal pilihan yang menggugah selera."}
        </p>
        <div className="font-black text-xl text-foreground">
          {formattedPrice}
        </div>
      </div>
    </div>
  );
}
