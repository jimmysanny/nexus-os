import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const coupon = await prisma.coupon.create({
    data: {
      code: body.code,
      percent: Number(body.percent),
      funnelId: body.funnelId
    }
  });
  return NextResponse.json(coupon);
}