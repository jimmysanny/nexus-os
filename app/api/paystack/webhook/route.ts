import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendReceiptEmail } from "@/lib/email"; // IMPORT THE EMAIL FUNCTION

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) return NextResponse.json({ message: "Secret missing" }, { status: 500 });

    // Verify Event Type
    if (body.event === "charge.success") {
      const { reference, amount, metadata, customer } = body.data;
      const email = customer.email;
      const funnelId = metadata?.funnelId;

      console.log(" Payment Recieved:", reference, amount);

      // 1. RECORD SALE IN DATABASE
      if (funnelId) {
        await prisma.order.create({
          data: {
            reference,
            amount: amount / 100, // Convert Kobo to KES
            currency: "KES",
            email,
            funnelId,
            status: "success"
          }
        });
      }

      // 2. SEND RECEIPT EMAIL (The part that was missing)
      await sendReceiptEmail(email, amount / 100, reference);
      
      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}