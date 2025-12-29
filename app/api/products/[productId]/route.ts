import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// FIX: Type 'params' as a Promise
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { userId } = auth();
    // FIX: Await the params to get the real ID
    const { productId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.delete({
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
    const { userId } = auth();
    // FIX: Await the params here too
    const { productId } = await params; 
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.update({
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