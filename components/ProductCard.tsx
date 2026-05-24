"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  originalPrice?: number;
  imageUrl: string | null;
  vendorShopName?: string;
}

export function ProductCard({ id, name, description, price, originalPrice, imageUrl, vendorShopName }: ProductCardProps) {
  const { addToCart } = useCart();
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

  const formattedOriginal = originalPrice ? new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(originalPrice) : null;

  return (
    <div className={cn(
      "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-border/40 shadow-sm",
      "hover:shadow-lg transition-all duration-300"
    )}>
      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full bg-muted/20 flex items-center justify-center p-4">
        {imageUrl ? (
           <img src={imageUrl} alt={name} className="object-contain w-full h-full mix-blend-multiply" />
        ) : (
           <div className="text-muted-foreground/30 font-bold text-sm uppercase">No Image</div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 relative">
        <h3 className="font-bold text-lg leading-tight mb-1 text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
          {description || "Ayam geprek nikmat dengan sambal pilihan yang menggugah selera."}
        </p>
        
        <div className="mt-auto">
          {formattedOriginal && (
            <div className="text-xs text-muted-foreground line-through mb-0.5">
              {formattedOriginal}
            </div>
          )}
          <div className="font-black text-xl text-foreground">
            {formattedPrice}
          </div>
        </div>

        {/* Add Button */}
        <button 
          onClick={() => addToCart({ id, name, price, imageUrl })}
          className="absolute bottom-4 right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
