import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateFunnelPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // AUTOMATICALLY CREATE A BLANK DRAFT
  const funnel = await prisma.funnel.create({
    data: {
      userId: user.id,
      name: "New Digital Product",
      price: 1000,
      description: "Product description...",
      published: false,
      digitalProductUrl: "",
    }
  });

  // REDIRECT TO THE EDITOR WITH THE NEW ID
  redirect(`/dashboard/funnels/${funnel.id}`);
}