import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import PageHeader from "@/components/PageHeader";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const user = await currentUser();
  const merchant = await prisma.merchant.findUnique({ where: { userId: user?.id } });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-start">
         <PageHeader title="Brand Studio" subtitle="Manage your public store identity" />
         {merchant?.username && (
           <a href={`/store/${merchant.username}`} target="_blank" className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-colors flex items-center gap-2">
             <span>Live Store</span>
             <span></span>
           </a>
         )}
      </div>
      <SettingsForm merchant={merchant} />
    </div>
  );
}