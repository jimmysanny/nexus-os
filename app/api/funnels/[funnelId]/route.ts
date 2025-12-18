import { NextResponse } from "next/server";
import { db } from "../../../../lib/db"; // Using relative path to be safe

export async function GET(
  req: Request,
  { params }: { params: Promise<{ funnelId: string }> }
) {
  try {
    // In Next.js 15, params is a Promise so we must await it
    const { funnelId } = await params;

    if (!funnelId) {
      return new NextResponse("Funnel ID Missing", { status: 400 });
    }

    const funnel = await db.funnel.findUnique({
      where: { id: funnelId },
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