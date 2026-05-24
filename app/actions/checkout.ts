"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(userId: string, items: any[], type: string, destination: string) {
  // Find or create a default vendor to own the products and orders if none exists
  let vendor = await prisma.vendorProfile.findFirst();
  
  if (!vendor) {
    const adminUser = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: "Admin Pusat",
        email: "admin@ayamgeprek.com",
        password: "hashed_password", // mock
        role: "VENDOR",
        updatedAt: new Date()
      }
    });
    vendor = await prisma.vendorProfile.create({
      data: {
        id: crypto.randomUUID(),
        userId: adminUser.id,
        shopName: "Ayam Geprek Merakyat Pusat",
        updatedAt: new Date()
      }
    });
  }

  // Ensure all products in the cart exist in the database before creating the order
  let totalAmount = 0;
  for (const item of items) {
    const existingProduct = await prisma.product.findUnique({
      where: { id: item.id }
    });
    
    if (!existingProduct) {
      // Create product on the fly to satisfy foreign key constraint
      await prisma.product.create({
        data: {
          id: item.id,
          vendorProfileId: vendor.id,
          name: item.name,
          price: item.price,
          description: "Menu Makanan",
          updatedAt: new Date()
        }
      });
    }
    totalAmount += item.price * item.quantity;
  }

  // Create the Order
  const orderId = crypto.randomUUID();
  await prisma.order.create({
    data: {
      id: orderId,
      userId,
      vendorProfileId: vendor.id,
      totalAmount,
      status: "PENDING",
      updatedAt: new Date(),
      OrderItem: {
        create: items.map(item => ({
          id: crypto.randomUUID(),
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          notes: `${type}: ${destination}`
        }))
      }
    }
  });

  revalidatePath("/admin/orders");
  return { success: true, orderId };
}
