import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  try {
    const { userId } = await auth();
    const { productId } = await params;
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const product = await (db as any).product.findUnique({ where: { id: productId, userId } });
    if (!product) return new NextResponse("Not Found", { status: 404 });

    const duplicate = await (db as any).product.create({
      data: {
        userId,
        name: \\ (Copy)\,
        description: product.description,
        price: product.price,
        fileUrl: product.fileUrl,
        isPublished: false,
      },
    });
    return NextResponse.json(duplicate);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}