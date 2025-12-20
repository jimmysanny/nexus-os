import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { amount } = body;

    // SEND NOTIFICATION TO YOU (THE ADMIN)
    await resend.emails.send({
      from: "Nexus OS <onboarding@resend.dev>",
      to: "your-email@example.com", // <-- PUT YOUR REAL EMAIL HERE TO GET THE ALERTS
      subject: ` PAYOUT REQUEST: ${user.firstName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb;">New Payout Request</h2>
          <p><strong>Creator:</strong> ${user.firstName} ${user.lastName}</p>
          <p><strong>Email:</strong> ${user.emailAddresses[0].emailAddress}</p>
          <p style="font-size: 24px; font-weight: bold;">Amount: KES ${amount.toLocaleString()}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Action required: Verify balance and send via M-Pesa Business.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payout Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}