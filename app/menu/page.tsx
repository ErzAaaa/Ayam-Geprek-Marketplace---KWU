import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // Force dynamic to get latest DB changes

export default async function MenuPage() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: { VendorProfile: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-foreground">Menu <span className="text-primary">Geprek</span></h1>
          <p className="text-lg text-muted-foreground">Eksplorasi berbagai pilihan ayam geprek dari mitra terbaik kami.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 glass rounded-2xl border-dashed border-2">
            <h3 className="text-2xl font-bold mb-2">Belum ada menu 😢</h3>
            <p className="text-muted-foreground">Mitra kami sedang menyiapkan menu terbaiknya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrl}
                vendorShopName={product.VendorProfile?.shopName}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
