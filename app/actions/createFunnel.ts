"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createFunnel(name: string, description: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  let newFunnelId = "";

  try {
    const funnel = await prisma.funnel.create({
      data: {
        userId: user.id,
        name: name || "Untitled Funnel",
        description: description || "",
        price: 0,
        headline: "Edit Your Headline",
        subheadline: "Describe your product here...",
        published: false,
      },
    });
    newFunnelId = funnel.id;
  } catch (error) {
    console.error("Failed to create funnel:", error);
    return;
  }

  // Redirect to the Editor for the new funnel
  redirect(`/dashboard/funnels/${newFunnelId}`);
}
