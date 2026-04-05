import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendEnrollmentEmail({ to, studentName, courseName, courseUrl }: { to: string; studentName: string; courseName: string; courseUrl: string; }) {
  await getResend().emails.send({
    from: "Nexus OS <noreply@nexusos.co>",
    to,
    subject: `You are enrolled in ${courseName}!`,
    html: `<div style="font-family:sans-serif"><h1>Welcome to ${courseName}!</h1><p>Hi ${studentName}, your enrollment is confirmed.</p><a href="${courseUrl}">Start Learning</a></div>`,
  });
}
