import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Check, Clock, PackageCheck, ShoppingBag } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/orders";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });

  if (!vendor) {
    return <div>Profil Toko belum diatur.</div>;
  }

  const orders = await prisma.order.findMany({
    where: { vendorProfileId: vendor.id },
    include: {
      User: true,
      OrderItem: {
        include: { Product: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-zinc-800">Pesanan Masuk</h2>
        <p className="text-zinc-500 font-medium mt-1">Kelola dan perbarui status pesanan dari pelanggan.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-medium flex flex-col items-center">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
            <p>Belum ada pesanan masuk hari ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-sm font-bold text-zinc-500 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Menu Dipesan</th>
                  <th className="px-6 py-4">Total Harga</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-zinc-800">{order.User.name}</p>
                      <p className="text-sm text-zinc-500 mb-2">{order.User.email}</p>
                      {order.OrderItem[0]?.notes && (
                        <p className="text-xs font-medium text-primary bg-primary/10 inline-block px-2 py-1 rounded">
                          {order.OrderItem[0].notes}
                        </p>
                      )}
                      <p className="text-xs text-zinc-400 mt-2">{new Date(order.createdAt).toLocaleString("id-ID")}</p>
                    </td>
                    <td className="px-6 py-4">
                      <ul className="text-sm font-medium text-zinc-700">
                        {order.OrderItem.map(item => (
                          <li key={item.id}>
                            {item.quantity}x {item.Product.name}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 font-black text-zinc-800">
                      Rp {order.totalAmount.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                        order.status === "PENDING" ? "bg-yellow-50 text-yellow-600 border-yellow-200" :
                        order.status === "PROCESSING" ? "bg-blue-50 text-blue-600 border-blue-200" :
                        "bg-green-50 text-green-600 border-green-200"
                      }`}>
                        {order.status === "PENDING" && <Clock className="w-3 h-3" />}
                        {order.status === "PROCESSING" && <PackageCheck className="w-3 h-3" />}
                        {order.status === "COMPLETED" && <Check className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {order.status === "PENDING" && (
                        <form action={async () => {
                          "use server";
                          await updateOrderStatus(order.id, "PROCESSING");
                        }}>
                          <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-sm shadow-md">
                            Proses
                          </button>
                        </form>
                      )}
                      {order.status === "PROCESSING" && (
                        <form action={async () => {
                          "use server";
                          await updateOrderStatus(order.id, "COMPLETED");
                        }}>
                          <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-sm shadow-md">
                            Selesai
                          </button>
                        </form>
                      )}
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
