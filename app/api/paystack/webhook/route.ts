import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.event === "charge.success") {
      const { reference, amount, customer, metadata, currency } = body.data;
      await prisma.order.create({
        data: {
          funnelId: metadata.funnel_id,
          amount: amount / 100,
          currency: currency || "KES",
          status: "SUCCESS",
          customerEmail: customer.email,
          paymentId: reference,
        },
      });
    }
    return new NextResponse("OK", { status: 200 });
  } catch (e) { return new NextResponse("Error", { status: 500 }); }
}