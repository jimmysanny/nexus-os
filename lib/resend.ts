import { Resend } from "resend";



export async function sendEnrollmentEmail({
  to,
  studentName,
  courseName,
  courseUrl,
}: {
  to: string;
  studentName: string;
  courseName: string;
  courseUrl: string;
}) {
  await resend.emails.send({
    from: "Nexus OS <noreply@nexusos.co>",
    to,
    subject: `You're enrolled in ${courseName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1B2A4A;">Welcome to ${courseName}!</h1>
        <p>Hi ${studentName},</p>
        <p>Your enrollment is confirmed. You can start learning right away.</p>
        <a href="${courseUrl}" 
           style="display:inline-block; background:#C9A84C; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
          Start Learning
        </a>
        <p style="color:#888; font-size:12px; margin-top:32px;">Nexus OS — Built for African Creators</p>
      </div>
    `,
  });
}
