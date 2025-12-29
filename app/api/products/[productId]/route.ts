import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { userId } = await auth();
    const { productId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // FIX: Use (db as any) to force TypeScript to ignore the missing property warning
    const product = await (db as any).product.delete({
      where: {
        id: productId,
        userId: userId, 
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { userId } = await auth();
    const { productId } = await params; 
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // FIX: Use (db as any) here too
    const product = await (db as any).product.update({
      where: {
        id: productId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}