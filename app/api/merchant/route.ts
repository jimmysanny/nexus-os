import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const merchant = await prisma.merchant.findUnique({
    where: { userId: user.id }
  });
  return NextResponse.json(merchant);
}

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();

  // Create or Update logic
  const merchant = await prisma.merchant.upsert({
    where: { userId: user.id },
    update: { 
      username: body.username,
      name: body.name,
      bio: body.bio
    },
    create: {
      userId: user.id,
      username: body.username,
      name: body.name,
      bio: body.bio
    }
  });

  return NextResponse.json(merchant);
}