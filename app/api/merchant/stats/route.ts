import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const products = await prisma.funnel.findMany({ where: { userId: user.id } });
    const productIds = products.map(p => p.id);
    
    const orders = await prisma.order.findMany({
      where: { funnelId: { in: productIds }, status: "SUCCESS" }
    });

    const revenue = orders.reduce((acc, o) => acc + o.amount, 0);
    const fee = Math.round(revenue * 0.10);
    const balance = revenue - fee;

    return NextResponse.json({ revenue, fee, balance });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}