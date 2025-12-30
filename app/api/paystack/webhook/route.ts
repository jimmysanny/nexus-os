import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY || "";

    // 1. Validate the Event (Security Check)
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const event = body.event;
    const data = body.data;

    // 2. Handle Successful Payment
    if (event === "charge.success") {
      const { metadata, reference, amount, currency, customer } = data;

      // FIX: Map the incoming data to the correct Database Fields
      // 'funnelId' -> 'productId'
      // 'status' -> 'isPaid'
      
      await db.order.create({
        data: {
          userId: metadata?.userId || "unknown", 
          productId: metadata?.funnelId, // We map the incoming 'funnelId' to our 'productId' column
          amount: amount / 100,          // Convert Kobo to KES
          currency: currency || "KES",
          reference: reference,
          email: customer?.email,
          isPaid: true,                  // Database expects boolean 'isPaid', not string 'status'
        },
      });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}