'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function createClient(formData: FormData) {
  const { userId } = await auth()
  if (!userId) return

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string

  await db.client.create({
    data: {
      userId,
      name,
      email,
      phone,
      status: "Active"
    }
  })

  redirect("/dashboard/clients")
}
