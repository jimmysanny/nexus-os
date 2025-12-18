"use server";
import { db } from "@/lib/db";

export async function createOrder(funnelId: string, email: string, amount: number, reference: string) {
  try {
    console.log("NEW SALE ALERT!");
    console.log("Customer:", email);
    console.log("Amount:", amount);
    
    // Save to DB
    await db.order.create({
      data: {
        funnelId,
        customerEmail: email,
        amount,
        reference,
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false };
  }
}
