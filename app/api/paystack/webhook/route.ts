import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) {
      console.error("Missing Paystack Secret Key");
      return NextResponse.json({ message: "Configuration Error" }, { status: 500 });
    }

    // 1. Verify the Signature (Security Check)
    // Paystack sends a hash in the header. We must match it to ensure the request is real.
    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body))
      .digest("hex");

    const signature = req.headers.get("x-paystack-signature");

    if (hash !== signature) {
      return NextResponse.json({ message: "Invalid Signature" }, { status: 401 });
    }

    // 2. Handle the Event
    const event = body.event;
    const data = body.data;

    if (event === "charge.success") {
      console.log("💰 Payment Successful:", data.reference);

      // 3. Find the Product ID from Metadata
      // When we initiate payment on the frontend, we must pass "funnelId" in metadata
      const funnelId = data.metadata?.funnelId;
      
      if (funnelId) {
         // 4. Save the Order to Database
         await prisma.order.create({
           data: {
             reference: data.reference,
             amount: data.amount / 100, // Paystack sends kobo/cents, we convert back
             currency: data.currency,
             email: data.customer.email,
             status: "success",
             funnelId: funnelId
           }
         });
         console.log("✅ Order Saved to DB!");
      } else {
         console.warn("⚠️ Payment received but no Funnel ID found in metadata.");
      }
    }

    return NextResponse.json({ message: "Webhook Received" }, { status: 200 });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
