"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createFunnel(formData: FormData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const funnel = await prisma.funnel.create({
    data: {
      userId: user.id,
      name: name || "New Asset",
      description: description || "",
      price: 0,
      headline: "Edit Your Headline",
      subheadline: "Describe your product here...",
      published: false,
    },
  });

  redirect(`/dashboard/funnels/${funnel.id}`);
}