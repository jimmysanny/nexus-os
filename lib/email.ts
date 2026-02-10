import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const AGENCY_EMAIL = process.env.AGENCY_EMAIL || "hello@nexus.agency";
const FROM_EMAIL = process.env.FROM_EMAIL || "NEXUS Agency <onboarding@resend.dev>";

export async function sendContactConfirmation({
  name,
  email,
  service,
}: {
  name: string;
  email: string;
  service: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "We received your inquiry - NEXUS Agency",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #080808; color: #f5f0e8; padding: 40px;">
        <h1 style="color: #e8b84b; font-size: 24px;">Thank you, ${name}!</h1>
        <p style="line-height: 1.6; color: #999;">
          We received your inquiry about <strong style="color: #f5f0e8;">${service}</strong>. 
          Our team will review your request and get back to you within 24 hours.
        </p>
        <p style="line-height: 1.6; color: #999;">
          In the meantime, feel free to book a free strategy call with us.
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #222;">
          <p style="color: #666; font-size: 14px;">NEXUS Agency - Nairobi, Kenya</p>
        </div>
      </div>
    `,
  });
}

export async function sendAgencyNotification({
  name,
  email,
  phone,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: AGENCY_EMAIL,
    subject: `New Lead: ${name} - ${service}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone || "N/A"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${company || "N/A"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${service}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${budget || "N/A"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${message}</td></tr>
        </table>
      </div>
    `,
  });
}
