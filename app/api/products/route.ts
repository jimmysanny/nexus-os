import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create product with Name, Description, AND Price
    const product = await db.product.create({
      data: {
        userId,
        name: values.name,
        description: values.description,
        price: values.price || 0, // Defaults to 0 if missing
        isPublished: false,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}