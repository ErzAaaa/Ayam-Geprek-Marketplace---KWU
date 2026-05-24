import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Plus, Package, PackageX, Trash2 } from "lucide-react";
import { toggleProductAvailability, deleteProduct } from "@/app/actions/products";
import { AddProductForm } from "./AddProductForm";

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    return <div>Profil Toko belum diatur.</div>;
  }

  const products = await prisma.product.findMany({
    where: { vendorProfileId: vendor.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-zinc-800">Daftar Menu</h2>
          <p className="text-zinc-500 font-medium mt-1">Kelola menu makanan dan minuman yang dijual.</p>
        </div>
        <AddProductForm vendorId={vendor.id} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        {products.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-medium flex flex-col items-center">
            <PackageX className="w-16 h-16 mb-4 opacity-50" />
            <p>Belum ada menu yang ditambahkan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-sm font-bold text-zinc-500">
                <tr>
                  <th className="px-6 py-4">Menu</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Status Stok</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-zinc-800">{product.name}</p>
                      <p className="text-sm text-zinc-500">{product.description}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-800">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <form action={async () => {
                        "use server";
                        await toggleProductAvailability(product.id, !product.isAvailable);
                      }}>
                        <button
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                            product.isAvailable 
                              ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" 
                              : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          }`}
                        >
                          {product.isAvailable ? "Tersedia" : "Habis"}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <form action={async () => {
                        "use server";
                        await deleteProduct(product.id);
                      }}>
                        <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
