import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const coupon = await prisma.coupon.create({
      data: { code: body.code.toUpperCase(), percent: Number(body.percent), funnelId: body.funnelId || null },
    });
    return NextResponse.json(coupon);
  } catch (e) { return new NextResponse("Error", { status: 500 }); }
}