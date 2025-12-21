"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createFunnel(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const funnel = await prisma.funnel.create({
    data: {
      userId: user.id,
      name: (formData.get("name") as string) || "New Asset",
      description: (formData.get("description") as string) || "",
    },
  });
  redirect(`/dashboard/funnels/${funnel.id}`);
}

export async function updateFunnel(id: string, data: any) {
  await prisma.funnel.update({
    where: { id },
    data: { ...data, updatedAt: new Date() }
  });
  revalidatePath(`/dashboard/funnels/${id}`);
}

// FIXED: Now accepts affiliateCode
export async function recordOrder(funnelId: string, amount: number, reference: string, email: string, affiliateCode?: string) {
  return await prisma.order.create({
    data: {
      funnelId,
      amount,
      paymentId: reference,
      status: "SUCCESS",
      customerEmail: email,
      currency: "KES",
      affiliateCode: affiliateCode || null
    },
  });
}