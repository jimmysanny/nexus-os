"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function initiatePayment(funnelId: string) {
  const funnel = await prisma.funnel.findUnique({ where: { id: funnelId } });
  if (!funnel) throw new Error("Funnel not found");

  // Logic: In a real app, you would call Stripe/Paystack API here
  // For this OS, we generate a secure 'Simulation Token'
  const simulationToken = Math.random().toString(36).substring(7);

  const order = await prisma.order.create({
    data: {
      funnelId: funnelId,
      amount: funnel.price,
      status: "PAID", 
      email: `customer_${simulationToken}@nexus.os`,
    },
  });

  // Huge significance: This handles the success handshake
  redirect(`/thank-you?id=${funnelId}&order=${order.id}&verified=true`);
}