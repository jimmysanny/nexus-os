'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
  const { userId } = await auth()
  if (!userId) return

  const name = formData.get("name") as string
  const clientId = formData.get("clientId") as string
  const budget = parseFloat(formData.get("budget") as string) || 0
  const description = formData.get("description") as string

  await db.project.create({
    data: {
      userId,
      name,
      clientId,
      budget,
      description,
      status: "In Progress"
    }
  })

  redirect("/dashboard/projects")
}
