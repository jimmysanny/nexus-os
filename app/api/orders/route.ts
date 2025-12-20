import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { funnelId, amount, currency, reference, affiliateCode } = body;

    // 1. VERIFY PRODUCT
    const product = await prisma.funnel.findUnique({
      where: { id: funnelId }
    });

    if (!product) return new NextResponse("Product not found", { status: 404 });

    // 2. SAVE ORDER
    const order = await prisma.order.create({
      data: {
        funnelId: funnelId,
        amount: amount,
        status: "SUCCESS",
        customerEmail: "user@example.com", // In production, pass this from the checkout!
        paymentId: reference
      }
    });

    // 3. SEND REAL EMAIL (Via Resend)
    if (product.digitalProductUrl) {
      await resend.emails.send({
        from: "Nexus OS <onboarding@resend.dev>", // Change this if you verified your domain!
        to: "delivered@resend.dev", // CHANGE THIS to the actual customer email in production
        subject: `Download Ready: ${product.name}`,
        html: `
          <h1>Thank you for your purchase!</h1>
          <p>You bought <strong>${product.name}</strong> for ${currency} ${amount}.</p>
          <p>Here is your secure download link:</p>
          <a href="${product.digitalProductUrl}" style="padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Download Now
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Transaction ID: ${reference}</p>
        `
      });
      console.log(" EMAIL SENT via Resend");
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Order Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}