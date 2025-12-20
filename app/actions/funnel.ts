"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateFunnel(id: string, data: any) {
  await prisma.funnel.update({
    where: { id },
    data: {
      ...data,
      // The database handles updatedAt automatically now
    }
  });
  revalidatePath(`/dashboard/funnels/${id}`);
}