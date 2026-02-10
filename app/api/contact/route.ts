import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendContactConfirmation,
  sendAgencyNotification,
} from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Name, email, service, and message are required." },
        { status: 400 }
      );
    }

    // Save to database
    await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service,
        budget: budget || null,
        message,
      },
    });

    // Send emails (non-blocking — don't fail the request if email fails)
    try {
      await Promise.all([
        sendContactConfirmation({ name, email, service }),
        sendAgencyNotification({
          name,
          email,
          phone,
          company,
          service,
          budget,
          message,
        }),
      ]);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue — contact was still saved
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
