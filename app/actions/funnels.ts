"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createFunnel(name: string, description?: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // We fixed the table name from 'funnel' to 'product' here
  const product = await db.product.create({
    data: {
      userId,
      name,
      description: description || "",
      price: 0, // Default price
      isPublished: false,
    },
  });

  revalidatePath("/dashboard/funnels");
  return product;
}

export async function getFunnels() {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  const products = await db.product.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}