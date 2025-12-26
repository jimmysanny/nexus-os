'use server'
import { resend } from "@/lib/resend"

export async function sendTestEmail(formData: FormData) {
  const email = formData.get("email") as string
  try {
    const data = await resend.emails.send({
      from: 'Nexus OS <admin@nexusos.africa>',
      to: [email],
      subject: 'It Works! Nexus OS System Test',
      html: '<h1>System Operational</h1><p>Your domain <strong>nexusos.africa</strong> is correctly configured and sending emails.</p>'
    });

    if (data.error) return { success: false, message: data.error.message };
    return { success: true, message: "Email Sent! Check your inbox." };
  } catch (error) {
    return { success: false, message: "Failed: " + (error as Error).message };
  }
}
