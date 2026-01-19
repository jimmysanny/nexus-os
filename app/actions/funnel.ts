"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// 1. Get All Funnels for Dashboard
export async function getFunnels() {
  const { userId } = await auth();
  if (!userId) return [];
  return await db.funnel.findMany({ where: { userId } });
}

// 2. Create OR Save Funnel (The Fix)
export async function saveFunnel(content: string, name?: string, id?: string) {
  const { userId } = await auth();
  if (!userId) return { success: false, error: "Unauthorized" };

  try {
    if (id) {
      // UPDATE existing funnel
      await db.funnel.update({
        where: { id },
        data: { blocks: content, name: name },
      });
    } else {
      // CREATE new funnel
      await db.funnel.create({
        data: {
          userId,
          name: name || "Untitled Funnel",
          blocks: content,
          published: false,
        },
      });
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save" };
  }
}

// 3. Analytics: Record Visit
export async function recordVisit(funnelId: string) {
  try {
    await db.funnel.update({
      where: { id: funnelId },
      data: { visits: { increment: 1 } },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
