"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// 1. Fetch a Funnel
export async function getFunnel(funnelId: string) {
  const user = await currentUser();
  if (!user) return null;

  return await db.funnel.findUnique({
    where: { 
      id: funnelId,
      userId: user.id // Ensure they own it
    },
    include: { orders: true }
  });
}

// 2. Update a Funnel (CORRECTED SCHEMA)
export async function updateFunnel(
  funnelId: string, 
  data: { 
    name?: string; 
    headline?: string;
    subheadline?: string; // This maps to "description" in some views
    price?: number;
    published?: boolean;
    heroImage?: string;
  }
) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  // We only update fields that actually exist in the DB
  return await db.funnel.update({
    where: { id: funnelId },
    data: {
      ...data,
      updatedAt: new Date(),
    }
  });
}
