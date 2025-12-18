"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveFunnel(funnelId: string, data: any) {
  try {
    await db.funnel.update({
      where: { id: funnelId },
      data: {
        headline: data.headline,
        subheadline: data.description,
        price: parseFloat(data.price),
        theme: data.themeColor,
        font: data.font,
        logoUrl: data.logoUrl,
        heroImage: data.heroImageUrl,
        customHtml: data.customHtml,
        published: true,
      },
    });
    revalidatePath("/dashboard/funnels");
    return { success: true };
  } catch (error) {
    console.error("Save Error:", error);
    return { success: false };
  }
}
