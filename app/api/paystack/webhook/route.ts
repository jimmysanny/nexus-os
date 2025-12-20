import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(body)).digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (body.event === "charge.success") {
      const { reference, amount, currency, customer, metadata } = body.data;
      const { funnelId, affiliateCode } = metadata || {};

      if (funnelId) {
        await prisma.order.create({
          data: {
            amount: amount / 100,
            currency: currency,
            status: "SUCCESS",
            email: customer.email,
            providerReference: reference,
            funnelId: funnelId,
            affiliateCode: affiliateCode || null // SAVE THE REFERRER
          },
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}