import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const coupon = await prisma.coupon.create({
      data: {
        code: body.code.toUpperCase(),
        percent: Number(body.percent),
        funnelId: body.funnelId || null, // FIXED: Now matches schema
      },
    });
    return NextResponse.json(coupon);
  } catch (error) {
    return new NextResponse("Error creating coupon", { status: 500 });
  }
}