'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function createInvoice(formData: FormData) {
  const { userId } = await auth()
  if (!userId) return

  const clientId = formData.get("clientId") as string
  const projectId = formData.get("projectId") as string
  const amount = parseFloat(formData.get("amount") as string)
  const dueDate = new Date(formData.get("dueDate") as string)

  // 1. Get Client Email
  const client = await db.client.findUnique({ where: { id: clientId } })
  if (!client || !client.email) throw new Error("Client email required")

  // 2. Call Paystack API
  let paymentLink = ""
  let paystackRef = ""

  try {
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: \Bearer \\,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: client.email,
        amount: amount * 100,
        currency: "KES",
        metadata: {
          userId: userId,
          custom_fields: [{ display_name: "Invoice For", variable_name: "invoice_for", value: "Service Payment" }]
        }
      })
    })
    const paystackData = await paystackRes.json()
    if (paystackData.status) {
       paymentLink = paystackData.data.authorization_url
       paystackRef = paystackData.data.reference
    }
  } catch (error) {
    console.log("Paystack Error:", error)
  }

  // 3. Save Invoice
  await db.invoice.create({
    data: {
      userId,
      clientId,
      projectId: projectId || null,
      amount,
      dueDate,
      status: "Pending",
      paymentLink,
      paystackRef
    }
  })

  redirect("/dashboard/invoices")
}
