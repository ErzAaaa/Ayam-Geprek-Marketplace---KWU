import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  // We need to find the VendorProfile for this user
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    return <div>Profil Toko belum diatur. Silakan hubungi admin pusat.</div>;
  }

  // Get statistics
  const totalOrders = await prisma.order.count({
    where: { vendorProfileId: vendor.id }
  });

  const completedOrders = await prisma.order.findMany({
    where: { vendorProfileId: vendor.id, status: "COMPLETED" },
    select: { totalAmount: true }
  });

  const totalRevenue = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  const activeProducts = await prisma.product.count({
    where: { vendorProfileId: vendor.id, isAvailable: true }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-zinc-800">Overview</h2>
        <p className="text-zinc-500 font-medium mt-1">Selamat datang kembali di dasbor, {vendor.shopName}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Total Pendapatan</h3>
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-800">
            Rp {totalRevenue.toLocaleString("id-ID")}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Total Pesanan</h3>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-800">
            {totalOrders}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Menu Aktif</h3>
            <div className="bg-orange-100 p-3 rounded-full text-orange-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-800">
            {activeProducts}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Performa</h3>
            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-black text-zinc-800">
            Baik
          </div>
        </div>
      </div>
    </div>
  );
}
