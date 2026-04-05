import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { initializePaystackTransaction } from "@/lib/paystack";
import { initiateMpesaStkPush } from "@/lib/intasend";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { courseId, provider, phone } = await req.json();

  if (!courseId || !provider) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const studentName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course) return new NextResponse("Course not found", { status: 404 });

  // Check if already enrolled
  const existing = await db.enrollment.findUnique({
    where: { clerkId_courseId: { clerkId: userId, courseId } },
  });
  if (existing) return new NextResponse("Already enrolled", { status: 409 });

  const reference = `NXS-${nanoid(12)}`;
  const amountKes = course.price;

  // ── Create a pending payment record first
  await db.payment.create({
    data: {
      clerkId: userId,
      courseId,
      tenantId: course.tenantId,
      amount: amountKes,
      currency: "KES",
      provider: provider === "intasend" ? "INTASEND" : "PAYSTACK",
      providerRef: reference,
      status: "PENDING",
    },
  });

  try {
    if (provider === "paystack") {
      const result = await initializePaystackTransaction({
        email,
        amount: amountKes * 100, // kobo
        reference,
        metadata: { courseId, tenantId: course.tenantId, clerkId: userId, email, studentName },
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses/${courseId}`,
      });

      return NextResponse.json({ url: result.authorization_url });
    }

    if (provider === "intasend") {
      if (!phone) return new NextResponse("Phone required for M-Pesa", { status: 400 });

      const result = await initiateMpesaStkPush({
        phone,
        amount: amountKes,
        email,
        narrative: `Enrollment: ${course.title}`,
        reference,
      });

      return NextResponse.json({ invoiceId: result.invoice.invoice_id });
    }

    return new NextResponse("Invalid provider", { status: 400 });
  } catch (err) {
    console.error("[CHECKOUT] Error:", err);
    // Mark payment failed
    await db.payment.updateMany({ where: { providerRef: reference }, data: { status: "FAILED" } });
    return new NextResponse("Payment initialization failed", { status: 500 });
  }
}
