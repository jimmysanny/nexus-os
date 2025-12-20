import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import VaultCard from "@/components/VaultCard";

export default async function VaultPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const funnels = await prisma.funnel.findMany({
    where: { userId: user.id },
    select: { name: true, digitalProductUrl: true, id: true }
  });

  return (
    <div>
      <DashboardNav title="Products" subtitle="Manage your digital inventory" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {funnels.map((f, i) => <VaultCard key={i} funnel={f} />)}
      </div>
    </div>
  );
}