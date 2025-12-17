'use server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

// 1. Get All Products (Owner Only)
export async function getProducts() {
  const { userId } = await auth()
  if (!userId) return []
  
  return await prisma.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

// 2. Create Product
export async function createProduct(name: string, price: number, currency: string = "KES") {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return await prisma.product.create({
    data: {
      userId,
      name,
      price,
      currency
    }
  })
}

// 3. Delete Product
export async function deleteProduct(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // Ensure user owns the product before deleting
  const product = await prisma.product.findUnique({ where: { id } })
  if (product?.userId !== userId) throw new Error("Unauthorized")

  return await prisma.product.delete({
    where: { id }
  })
}