"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveFunnel(funnelId: string, data: any) {
  try {
    console.log(" Saving Funnel:", funnelId);
    console.log(" Data:", JSON.stringify(data, null, 2));

    const funnel = await prisma.funnel.upsert({
      where: { id: funnelId },
      update: {
        name: data.headline || "Untitled Funnel",
        description: data.description || "",
        price: parseFloat(data.price) || 0,
        headline: data.headline || "",
        subheadline: data.description || "",
        themeColor: data.themeColor || "blue",
        font: data.font || "sans",
        logoUrl: data.logoUrl || "",
        heroImageUrl: data.heroImageUrl || "",
        digitalProductUrl: data.digitalProductUrl || "",
        productName: data.productName || "Digital Download"
      },
      create: {
        id: funnelId,
        userId: "user_123",
        name: data.headline || "Untitled Funnel",
        description: data.description || "",
        price: parseFloat(data.price) || 0,
        headline: data.headline || "",
        subheadline: data.description || "",
        published: true,
        themeColor: data.themeColor || "blue",
        font: data.font || "sans",
        logoUrl: data.logoUrl || "",
        heroImageUrl: data.heroImageUrl || "",
        digitalProductUrl: data.digitalProductUrl || "",
        productName: data.productName || "Digital Download"
      },
    });

    revalidatePath("/dashboard");
    return { success: true, funnel };
  } catch (error: any) {
    console.error(" SAVE FAILED:", error);
    throw new Error(error.message);
  }
}
