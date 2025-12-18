'use server'
import { db } from '@/lib/db'; // Using the safe connection
import { auth } from '@clerk/nextjs/server'

// 1. Get All Products
export async function getProducts() {
  const { userId } = await auth()
  if (!userId) return []
  
  return await db.product.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
}

// 2. Create Product
export async function createProduct(name: string, price: number, currency: string = "KES") {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return await db.product.create({
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

  const product = await db.product.findUnique({ where: { id } })
  if (product?.userId !== userId) throw new Error("Unauthorized")

  return await db.product.delete({
    where: { id }
  })
}
