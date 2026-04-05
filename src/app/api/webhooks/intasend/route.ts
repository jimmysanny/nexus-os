import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEnrollmentEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // IntaSend sends invoice state updates
  const { invoice_id, state, api_ref } = body?.invoice ?? {};

  if (!invoice_id || state !== "COMPLETE") {
    return NextResponse.json({ received: true });
  }

  try {
    // ── 1. Find payment by providerRef (api_ref = our reference)
    const payment = await db.payment.findUnique({
      where: { providerRef: api_ref },
      include: { course: true },
    });

    if (!payment) {
      console.error("[INTASEND WEBHOOK] Payment not found:", api_ref);
      return new NextResponse("Not Found", { status: 404 });
    }

    // ── 2. Mark payment success
    await db.payment.update({
      where: { id: payment.id },
      data: { status: "SUCCESS", webhookVerified: true },
    });

    // ── 3. Enroll student
    await db.enrollment.upsert({
      where: { clerkId_courseId: { clerkId: payment.clerkId, courseId: payment.courseId } },
      update: {},
      create: {
        clerkId: payment.clerkId,
        courseId: payment.courseId,
        tenantId: payment.tenantId,
      },
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[INTASEND WEBHOOK] Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
