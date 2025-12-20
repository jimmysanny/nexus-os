import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const funnel = await prisma.funnel.update({
    where: { id: id },
    data: {
      name: body.name,
      description: body.description,
      price: Number(body.price),
      published: body.published,
      category: body.category, // SAVING THE NEW FIELD
      digitalProductUrl: body.digitalProductUrl
    }
  });

  return NextResponse.json(funnel);
}