'use server'

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFunnel(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const headline = formData.get("headline") as string;

  if (!name || !price) {
    throw new Error("Name and Price are required");
  }

  try {
    await prisma.funnel.create({
      data: {
        userId,
        name,
        description,
        price,
        headline: headline ? [headline] : [],
        published: true,
        currency: "KES",
      },
    });

    revalidatePath("/dashboard/funnels");
  } catch (error) {
    console.error("Database Error:", error);
    // In a real app, you might want to return the error to the UI
    return { message: "Failed to create funnel" };
  }

  // Redirect must be outside the try/catch block
  redirect("/dashboard/funnels");
}
