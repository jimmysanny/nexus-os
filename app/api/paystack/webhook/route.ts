import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const event = body;

    if (event.event === "charge.success") {
      const { metadata, amount, customer } = event.data;
      
      const paidAmount = amount / 100; // KES
      const fee = paidAmount * 0.10;   // 10%
      const net = paidAmount * 0.90;   // 90%

      if (metadata?.orderId) {
        await db.order.update({
          where: { id: metadata.orderId },
          data: { status: "paid" }
        });
      } else {
        await db.order.create({
          data: {
            productId: metadata?.funnelId || "unknown",
            price: paidAmount,
            fee: fee,
            net: net,
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