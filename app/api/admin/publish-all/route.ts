import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const result = await (db as any).product.updateMany({
      data: { isPublished: true }
    });
    return NextResponse.json({ message: "Success", count: result.count });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}