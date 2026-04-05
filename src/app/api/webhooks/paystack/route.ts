import { NextRequest, NextResponse } from "next/server";
import { verifyPaystackWebhook } from "@/lib/paystack";
import { db } from "@/lib/db";
import { sendEnrollmentEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // ── 1. Verify signature
  if (!verifyPaystackWebhook(rawBody, signature)) {
    console.error("[PAYSTACK WEBHOOK] Invalid signature");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // ── 2. Only handle successful charges
  if (event.event !== "charge.success") {
    return NextResponse.json({ received: true });
  }

  const { reference, metadata, amount } = event.data;
  const { courseId, tenantId, clerkId, email, studentName } = metadata ?? {};

  if (!courseId || !tenantId || !clerkId) {
    console.error("[PAYSTACK WEBHOOK] Missing metadata", metadata);
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    // ── 3. Mark payment as success
    await db.payment.updateMany({
      where: { providerRef: reference },
      data: { status: "SUCCESS", webhookVerified: true },
    });

    // ── 4. Create enrollment (upsert to prevent duplicates)
    await db.enrollment.upsert({
      where: { clerkId_courseId: { clerkId, courseId } },
      update: {},
      create: { clerkId, courseId, tenantId },
    });

    // ── 5. Fetch course for email
    const course = await db.course.findUnique({ where: { id: courseId } });

    if (course && email && studentName) {
      const courseUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/courses/${courseId}`;
      await sendEnrollmentEmail({ to: email, studentName, courseName: course.title, courseUrl });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[PAYSTACK WEBHOOK] Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
