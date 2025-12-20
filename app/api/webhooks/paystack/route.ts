import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { ReceiptEmail } from "@/components/emails/ReceiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) return NextResponse.json({ message: "No Secret Key" }, { status: 200 });

    const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(body)).digest("hex");
    if (hash !== req.headers.get("x-paystack-signature")) return NextResponse.json({ message: "Invalid Signature" }, { status: 401 });

    const { event, data } = body;

    if (event === "charge.success") {
      const email = data.customer.email;
      const amount = data.amount / 100;
      const funnelId = data.metadata?.custom_fields?.find((f: any) => f.variable_name === "funnel_id")?.value;

      if (funnelId) {
        // 1. Record Revenue
        const order = await prisma.order.create({
          data: { amount, email, status: "SUCCESS", funnelId }
        });

        // 2. Fetch Product Details
        const funnel = await prisma.funnel.findUnique({ where: { id: funnelId } });

        // 3. Send Receipt Email (The "Retention" Layer)
        if (funnel && funnel.digitalProductUrl) {
          await resend.emails.send({
            from: "Nexus <onboarding@resend.dev>",
            to: email,
            subject: `Download Your Asset: ${funnel.name}`,
            react: ReceiptEmail({ 
              productName: funnel.name, 
              price: amount, 
              downloadUrl: funnel.digitalProductUrl,
              orderId: order.id.slice(0, 8).toUpperCase()
            }),
          });
          console.log(`📧 RECEIPT SENT to ${email}`);
        }
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}