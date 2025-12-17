'use server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

// 1. Secure: Get Funnel for Dashboard (Owner Only)
export async function getFunnel(id: string) {
  const { userId } = await auth()
  if (!userId) return null
  
  const funnel = await prisma.funnel.findUnique({
    where: { id }
  })
  
  // Security check: Only return if owner matches
  if (funnel && funnel.userId !== userId) return null
  return funnel
}

// 2. Public: Get Funnel for Viewer (Everyone)
export async function getPublicFunnel(id: string) {
  try {
    const funnel = await prisma.funnel.findUnique({
      where: { id }
    })
    return funnel
  } catch (e) {
    console.error("Database Error:", e)
    return null
  }
}

// 3. Secure: Save Funnel
export async function saveFunnel(id: string, blocks: any[], name: string = "Untitled Funnel") {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return await prisma.funnel.upsert({
    where: { id },
    update: { 
      blocks: blocks,
      updatedAt: new Date()
    },
    create: {
      id,
      userId,
      name,
      blocks: blocks,
      published: false
    }
  })
}