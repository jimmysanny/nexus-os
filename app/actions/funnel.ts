'use server'
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache';

// GET LIST
export async function getFunnels() {
  const { userId } = await auth();
  if (!userId) return [];
  return await db.funnel.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });
}

// GET SINGLE
export async function getFunnel(id: string) {
  const { userId } = await auth()
  if (!userId) return null
  const funnel = await db.funnel.findUnique({ where: { id } })
  if (funnel && funnel.userId !== userId) return null
  return funnel
}

// GET PUBLIC
export async function getPublicFunnel(id: string) {
  try { return await db.funnel.findUnique({ where: { id } }) } catch (e) { return null }
}

// SAVE
export async function saveFunnel(content: string, name: string, id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  const existing = await db.funnel.findUnique({ where: { id } })
  
  if (existing) {
    return await db.funnel.update({ where: { id }, data: { blocks: content, name: name, updatedAt: new Date() } })
  } else {
    return await db.funnel.create({ data: { id, userId, name: name || "Untitled Funnel", blocks: content, published: false } })
  }
}

// DELETE (New!)
export async function deleteFunnel(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  
  await db.funnel.delete({ where: { id } })
  revalidatePath('/dashboard/funnels') // Refresh the list automatically
}
