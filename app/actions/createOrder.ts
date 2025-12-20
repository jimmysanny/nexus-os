"use server";
import { prisma } from "@/lib/prisma";

export async function createOrder(funnelId: string, amount: number) {
  return await prisma.order.create({
    data: {
      funnelId: funnelId,
      amount: amount,
      status: "SUCCESS",
      customerEmail: "verified_customer@nexus.os", // FIXED: Matches schema
    },
  });
}