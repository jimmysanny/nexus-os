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
  const amountInCents = amountRaw * 100 

  // 1. GET CLIENT
  const client = await db.client.findUnique({ where: { id: clientId } })
  if (!client || !client.email) return { error: "Client email is missing" }

  // 2. CONNECT TO PAYSTACK (Using the Vercel Variables)
  let paymentLink = "https://nexusos.africa/payment-error"
  
  try {
    //  THIS LINE IS CRITICAL. It tells the code to read the key you added.
    const secretKey = process.env.PAYSTACK_SECRET_KEY; 

    if (!secretKey || secretKey.includes("dummy")) {
      console.error(" ERROR: The code cannot find the Real Key in Vercel.");
    }

    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: client.email,
        amount: amountInCents,
        currency: 'KES',
        metadata: { custom_fields: [{ display_name: "Invoice For", value: description }] }
      })
    })

    const data = await paystackResponse.json()
    
    if (data.status && data.data) {
      paymentLink = data.data.authorization_url
    } else {
      console.error(" Paystack Rejected:", data)
    }
  } catch (err) {
    console.error("Payment Generation Failed", err)
  }

  // 3. SAVE TO DB
  const newInvoice = await db.invoice.create({
    data: {
      userId,
      clientId,
      amount: amountRaw,
      description,
      dueDate,
      status: "Pending",
      paymentLink: paymentLink,
    },
    include: { client: true }
  })

  // 4. SEND EMAIL
  await resend.emails.send({
    from: 'Nexus OS <admin@nexusos.africa>',
    to: [client.email],
    subject: `Invoice #${newInvoice.id.substring(0,4).toUpperCase()}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h1>Invoice: KES ${amountRaw.toLocaleString()}</h1>
        <p><strong>Service:</strong> ${description}</p>
        <br />
        <a href="${paymentLink}" style="background:#000; color:#fff; padding:15px 30px; text-decoration:none; border-radius:5px; font-weight:bold;">
          Pay Now
        </a>
      </div>
    `
  })

  redirect("/dashboard/invoices")
}
