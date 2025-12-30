import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReceiptEmail } from "@/lib/email"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) return NextResponse.json({ message: "Secret missing" }, { status: 500 });

    if (body.event === "charge.success") {
      const { reference, amount, metadata, customer, currency } = body.data; // GET CURRENCY FROM PAYSTACK
      const email = customer.email;
      const funnelId = metadata?.funnelId;

      console.log(` Payment: ${currency} ${amount/100}`);

      // 1. Record Sale with Correct Currency
      if (funnelId) {
        await prisma.order.create({
          data: {
            reference,
            amount: amount / 100,
            currency: currency || "KES", // Save USD/KES/NGN
            email,
            funnelId,
            status: "success"
          }
        });
      }

      // 2. Send Receipt with Correct Currency
      await sendReceiptEmail(email, amount / 100, reference, currency);
      
      return NextResponse.json({ status: "success" });
    }

    return NextResponse.json({ status: "ignored" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}