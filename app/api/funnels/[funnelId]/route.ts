import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Make sure this path points to your prisma db setup

// GET: Fetch the funnel details
export async function GET(
  req: Request,
  { params }: { params: { funnelId: string } }
) {
  try {
    if (!params.funnelId) {
      return new NextResponse("Funnel ID is required", { status: 400 });
    }

    const funnel = await db.funnel.findUnique({
      where: { id: params.funnelId },
    });

    if (!funnel) {
      return new NextResponse("Funnel not found", { status: 404 });
    }

    return NextResponse.json(funnel);
  } catch (error) {
    console.error("[FUNNEL_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// PATCH: Save updates to the funnel
export async function PATCH(
  req: Request,
  { params }: { params: { funnelId: string } }
) {
  try {
    const values = await req.json();

    if (!params.funnelId) {
      return new NextResponse("Funnel ID is required", { status: 400 });
    }

    const funnel = await db.funnel.update({
      where: { id: params.funnelId },
      data: { ...values, updatedAt: new Date() },
    });

    return NextResponse.json(funnel);
  } catch (error) {
    console.error("[FUNNEL_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}