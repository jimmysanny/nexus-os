"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createOrder(funnelId: string, amount: number) {
  let orderId = "";
  
  try {
    // 1. Create the Order with unique 'Customer' metadata
    const order = await prisma.order.create({
      data: {
        funnelId: funnelId,
        amount: amount,
        status: "PAID", 
        email: `customer_${Math.floor(Math.random() * 1000)}@example.com`,
      },
    });

    orderId = order.id;
    console.log(" TRANSACTION SUCCESSFUL:", orderId);

  } catch (error) {
    console.error(" TRANSACTION FAILED:", error);
    throw new Error("Checkout failed");
  }

  // Instant redirect to success
  redirect(`/thank-you?id=${funnelId}&order=${orderId}&status=success`);
}
