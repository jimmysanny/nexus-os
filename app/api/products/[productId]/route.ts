import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { userId } = await auth();
    const { productId } = await params;
    const values = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const product = await (db as any).product.update({
      where: { id: productId, userId },
      data: { ...values },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { userId } = await auth();
    const { productId } = await params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const product = await (db as any).product.delete({
      where: { id: productId, userId },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}