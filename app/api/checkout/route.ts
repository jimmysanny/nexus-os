import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, email } = body;

    if (!productId || !email) return new NextResponse("Missing data", { status: 400 });

    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product || !product.isPublished) return new NextResponse("Product not found", { status: 404 });

    // 10% FEE LOGIC
    const amount = product.price || 0;
    const platformFee = amount * 0.10; 
    const creatorNet = amount - platformFee;

    const order = await db.order.create({
      data: {
        productId: product.id,
        price: amount,
        fee: platformFee,
        net: creatorNet,
        customerEmail: email,
        status: "pending"
      }
    });

    return NextResponse.json({ url: "https://checkout.paystack.com/preview", orderId: order.id });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}