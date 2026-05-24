"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
  await prisma.product.update({
    where: { id: productId },
    data: { isAvailable },
  });
  revalidatePath("/admin/products");
  revalidatePath("/menu");
}

export async function createProduct(vendorProfileId: string, data: { name: string, description: string, price: number }) {
  await prisma.product.create({
    data: {
      id: crypto.randomUUID(),
      vendorProfileId,
      name: data.name,
      description: data.description,
      price: data.price,
      updatedAt: new Date(),
    }
  });
  revalidatePath("/admin/products");
  revalidatePath("/menu");
}

export async function deleteProduct(productId: string) {
  await prisma.product.delete({
    where: { id: productId },
  });
  revalidatePath("/admin/products");
  revalidatePath("/menu");
}
