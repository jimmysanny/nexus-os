"use server";
import { prisma } from "@/lib/prisma";

export async function createOrder(funnelId: string, amount: number) {
  return await prisma.order.create({
    data: {
      funnelId: funnelId,
      amount: amount,
      status: "PAID",
      customerEmail: `customer_${Math.floor(Math.random() * 1000)}@example.com`,
    },
  });
}