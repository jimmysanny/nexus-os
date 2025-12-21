import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import DashboardNav from "@/components/DashboardNav";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const user = await currentUser();
  const merchant = await prisma.merchant.findUnique({ where: { userId: user?.id } });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
         <DashboardNav title="Brand Studio" subtitle="Manage your public store identity" />
         <a href={`/store/${merchant?.username || ""}`} target="_blank" className="text-blue-600 font-bold text-sm hover:underline">
           View Live Store 
         </a>
      </div>
      <SettingsForm merchant={merchant} />
    </div>
  );
}