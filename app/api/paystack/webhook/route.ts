import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret || !signature) {
      return new NextResponse("Missing secret or signature", { status: 400 });
    }

    // 1. Verify the event comes from Paystack (Crypto Hash)
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return new NextResponse("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    // 2. Handle Successful Charge
    if (event.event === "charge.success") {
      const { reference, amount, metadata, customer } = event.data;
      const { funnelId } = metadata || {};

      if (!funnelId) {
        return new NextResponse("Missing funnelId in metadata", { status: 400 });
      }

      // 3. Record Order in Database (Idempotent: Check if exists first)
      const existingOrder = await prisma.order.findUnique({
        where: { id: reference }, // Assuming reference is used as ID or unique field
      });

      if (!existingOrder) {
        await prisma.order.create({
          data: {
            id: reference, // Use Paystack reference as Order ID
            amount: amount / 100, // Convert kobo/cents to main currency
            customerEmail: customer.email,
            funnelId: funnelId,
            status: "PAID",
          },
        });
        console.log(`✅ Order verified & recorded: ${reference}`);
      }
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}