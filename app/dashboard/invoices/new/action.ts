'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { resend } from "@/lib/resend"

export async function createInvoice(formData: FormData) {
  const { userId } = await auth()
  if (!userId) return { error: "User not found" }

  const clientId = formData.get("clientId") as string
  const amount = parseFloat(formData.get("amount") as string)
  const description = formData.get("description") as string
  const dueDate = new Date(formData.get("dueDate") as string)

  // 1. Create Invoice in Database
  const newInvoice = await db.invoice.create({
    data: {
      userId,
      clientId,
      amount,
      description,
      dueDate,
      status: "Pending",
    },
    include: { client: true }
  })

  // 2. Generate Paystack Link (We simulate this for now, or use the real key if you have it)
  // In a real app, you would call the Paystack API here.
  // For now, we generate a "Direct Payment Link" structure.
  const paymentLink = `https://checkout.paystack.com/pay/${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'demo'}`

  // 3. Send Email to Client (Using your NEW verified domain)
  if (newInvoice.client.email) {
    await resend.emails.send({
      from: 'Nexus OS <admin@nexusos.africa>',
      to: [newInvoice.client.email],
      subject: `Invoice #${newInvoice.id.substring(0,4)} from Nexus`,
      html: `
        <h1>New Invoice: KES ${amount.toLocaleString()}</h1>
        <p>Dear ${newInvoice.client.name},</p>
        <p>You have a new invoice for <strong>${description}</strong>.</p>
        <p><strong>Due Date:</strong> ${dueDate.toDateString()}</p>
        <br />
        <a href="${paymentLink}" style="background:#000; color:#fff; padding:12px 24px; text-decoration:none; border-radius:5px;">
          Pay Now
        </a>
      `
    })
  }

  redirect("/dashboard/invoices")
}
