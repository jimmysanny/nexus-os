import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // <--- MOVED TO /server
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth(); // Now this works

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
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
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = auth(); // Now this works
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await db.product.update({
      where: {
        id: params.productId,
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