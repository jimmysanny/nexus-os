'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { resend } from "@/lib/resend"

export async function createInvoice(formData: FormData) {
  const { userId } = await auth()
  if (!userId) return { error: "User not found" }

  const clientId = formData.get("clientId") as string
  const amountRaw = parseFloat(formData.get("amount") as string)
  const description = formData.get("description") as string
  const dueDate = new Date(formData.get("dueDate") as string)

  // PAYSTACK expects amount in Kobo/Cents (Multiply by 100)
  const amountInCents = amountRaw * 100 

  // 1. GET CLIENT DETAILS
  const client = await db.client.findUnique({ where: { id: clientId } })
  if (!client || !client.email) return { error: "Client email is missing" }

  // 2. GENERATE REAL PAYSTACK LINK (Server-to-Server)
  let paymentLink = ""
  
  try {
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // Using your Secret Key from Vercel
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: client.email,
        amount: amountInCents,
        currency: 'KES', // Force Kenya Shillings
        metadata: {
           custom_fields: [{ display_name: "Invoice For", value: description }]
        }
      })
    })

    const data = await paystackResponse.json()
    if (data.status && data.data) {
      paymentLink = data.data.authorization_url // The Secure Link
    } else {
      console.error("Paystack Error:", data)
      paymentLink = "https://nexusos.africa/error" // Fallback
    }
  } catch (err) {
    console.error("Payment Generation Failed", err)
  }

  // 3. SAVE TO DATABASE (Now saving the link!)
  const newInvoice = await db.invoice.create({
    data: {
      userId,
      clientId,
      amount: amountRaw,
      description,
      dueDate,
      status: "Pending",
      paymentLink: paymentLink, // <--- SAVING IT HERE
    },
    include: { client: true }
  })

  // 4. SEND EMAIL
  await resend.emails.send({
    from: 'Nexus OS <admin@nexusos.africa>',
    to: [client.email],
    subject: `Invoice #${newInvoice.id.substring(0,4).toUpperCase()} from Nexus`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>Invoice: KES ${amountRaw.toLocaleString()}</h1>
        <p>Dear ${client.name},</p>
        <p>Please find attached the invoice for <strong>${description}</strong>.</p>
        <p><strong>Due Date:</strong> ${dueDate.toDateString()}</p>
        <br />
        <a href="${paymentLink}" style="background:#000; color:#fff; padding:15px 30px; text-decoration:none; border-radius:5px; font-weight:bold;">
          Click Here to Pay Securely
        </a>
        <br /><br />
        <p style="color:#666; font-size: 12px;">Powered by Nexus OS</p>
      </div>
    `
  })

  redirect("/dashboard/invoices")
}
