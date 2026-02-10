import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// POST — Initialize a Paystack payment for an invoice
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "invoiceId is required." },
        { status: 400 }
      );
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice || invoice.clientId !== userId) {
      return NextResponse.json(
        { error: "Invoice not found." },
        { status: 404 }
      );
    }

    if (invoice.status === "Paid") {
      return NextResponse.json(
        { error: "Invoice already paid." },
        { status: 400 }
      );
    }

    // Initialize Paystack transaction
    const res = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: invoice.amount * 100, // Paystack uses kobo/cents
          currency: invoice.currency,
          reference: `INV-${invoice.id}-${Date.now()}`,
          callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/verify`,
          metadata: {
            invoiceId: invoice.id,
            clientId: userId,
          },
        }),
      }
    );

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(
        { error: "Failed to initialize payment." },
        { status: 500 }
      );
    }

    // Store reference
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { paystackRef: data.data.reference },
    });

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
