"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function saveFunnel(funnelId: string, data: any) {
  const user = await currentUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    // 1. SELF-HEAL: Ensure the User exists in our DB (in case of reset)
    await db.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      }
    });

    // 2. SAVE THE FUNNEL (Force subdomain to "test" so the button works)
    await db.funnel.upsert({
      where: { id: funnelId },
      update: {
        ...data,
        subdomain: "test", // Ensures /f/test always works
        published: true,
        price: parseFloat(data.price),
      },
      create: {
        id: funnelId,
        userId: user.id,
        name: "My First Funnel",
        subdomain: "test",
        published: true,
        ...data,
        price: parseFloat(data.price),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Save Error:", error);
    return { success: false, error: "Failed to save" };
  }
}
