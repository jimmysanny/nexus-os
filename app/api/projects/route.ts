import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET — Fetch projects for the logged-in user
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: { clientId: userId },
      include: { invoices: true },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Projects GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST — Create a new project (admin only)
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { clientId, name, service, dueDate, assignedTo } = body;

    if (!clientId || !name || !service) {
      return NextResponse.json(
        { error: "clientId, name, and service are required." },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        clientId,
        name,
        service,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedTo: assignedTo || null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Projects POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
