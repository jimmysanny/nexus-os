"use server";
import { db } from "@/lib/db";

export async function createOrder(data: { funnelId: string, email: string, amount: number, reference: string }) {
  try {
    const newOrder = await db.order.create({
      data: {
        funnelId: data.funnelId,
        customerEmail: data.email,
        amount: data.amount,
        reference: data.reference,
        status: "paid"
      }
    });

    // --- NOTIFICATION LOGIC ---
    // In a production app, you'd use Resend or SendGrid here.
    // For now, we log it to the server console so you can see it in Vercel Logs.
    console.log(" NEW SALE ALERT!");
    console.log(Customer: );
    console.log(Amount: app/actions/createOrder.ts{data.amount});
    console.log(Reference: );

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Order Error:", error);
    return { success: false };
  }
}
