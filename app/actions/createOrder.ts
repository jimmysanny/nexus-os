"use server";
import { db } from "@/lib/db";

export async function createOrder(data: { funnelId: string, email: string, amount: number, reference: string }) {
  try {
    await db.order.create({
      data: {
        funnelId: data.funnelId,
        customerEmail: data.email,
        amount: data.amount,
        reference: data.reference,
        status: "paid"
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false };
  }
}
