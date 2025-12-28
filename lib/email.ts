import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReceiptEmail(customerEmail: string, amount: number, reference: string) {
  // Safety Check
  if (!process.env.RESEND_API_KEY) {
    console.log("Resend Key missing, skipping email.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Nexus OS <info@nexusos.africa>',
      to: customerEmail,
      subject: 'Payment Receipt - Nexus OS',
      html: `
        <div style="font-family: sans-serif; max-w-md; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h1 style="color: #4f46e5;">Payment Received</h1>
          <p>Thank you for your purchase of <strong>KES ${amount}</strong>.</p>
          <p>Transaction Ref: <code style="background: #f4f4f5; padding: 4px; border-radius: 4px;">${reference}</code></p>
          <br/>
          <p>Your digital assets are unlocked.</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Nexus OS Inc.</p>
        </div>
      `
    });

    if (error) console.error("Resend Error:", error);
    else console.log("Email sent successfully:", data);

  } catch (err) {
    console.error("Failed to send email:", err);
  }
}