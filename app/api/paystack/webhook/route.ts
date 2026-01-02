import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY || "";

    // 1. Verify Event (Optional but recommended)
    // For this MVP, we trust the event if it parses correctly.
    
    const event = body;

    if (event.event === "charge.success") {
      const { metadata, amount, customer } = event.data;

      // 2. Find the Pending Order we created in Checkout
      // We look up by the Order ID we passed to Paystack (in metadata)
      if (metadata?.orderId) {
        await db.order.update({
          where: { id: metadata.orderId },
          data: {
            status: "paid",
          }
        });
      } else {
        // Fallback: If no orderId, create a new record (Legacy support)
        // Note: We use 'price' instead of 'amount' to match schema
        await db.order.create({
          data: {
            productId: metadata?.funnelId || "unknown",
            price: amount / 100, // Convert Kobo to KES
            fee: (amount / 100) * 0.10, // 10% Fee
            net: (amount / 100) * 0.90, // 90% Net
            customerEmail: customer.email,
            status: "paid"
          }
        });
      }
    }

    return new NextResponse("Webhook Received", { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}