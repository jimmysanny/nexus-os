"use server";
import { prisma } from "@/lib/prisma";

export async function initiatePayment(funnelId: string) {
  const funnel = await prisma.funnel.findUnique({ where: { id: funnelId } });
  if (!funnel) throw new Error("Funnel not found");

  const simulationToken = Math.floor(Math.random() * 1000);

  return await prisma.order.create({
    data: {
      funnelId: funnel.id,
      amount: funnel.price,
      status: "PAID",
      customerEmail: `customer_${simulationToken}@nexus.os`, // FIXED: Matches schema
    },
  });
}