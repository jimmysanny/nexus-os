import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { updateMerchantProfile } from "@/app/actions/actions";
import DashboardNav from "@/components/DashboardNav";

export default async function SettingsPage() {
  const user = await currentUser();
  const merchant = await prisma.merchant.findUnique({ where: { userId: user?.id } });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <DashboardNav title="Brand Studio" subtitle="Manage your public store identity" />
      
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        {/* Banner Preview */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 w-full relative">
           <div className="absolute -bottom-8 left-8">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                 
              </div>
           </div>
        </div>
        
        <form action={updateMerchantProfile} className="p-8 pt-12 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Store Name</label>
                 <input name="name" defaultValue={merchant?.name || ""} placeholder="e.g. Nexus Digital" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Username</label>
                 <div className="flex items-center">
                    <span className="bg-slate-100 border border-r-0 border-slate-200 p-3 rounded-l-xl text-slate-500 text-sm">nexus.os/store/</span>
                    <input name="username" defaultValue={merchant?.username || ""} placeholder="username" className="flex-1 p-3 rounded-r-xl border border-slate-200 bg-white font-medium outline-none focus:border-blue-500" />
                 </div>
              </div>
           </div>
           
           <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bio</label>
              <textarea name="bio" defaultValue={merchant?.bio || ""} placeholder="Tell your customers what you sell..." className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium h-24 outline-none focus:border-blue-500"></textarea>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Twitter</label>
                 <input name="twitter" defaultValue={merchant?.twitter || ""} placeholder="@username" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Instagram</label>
                 <input name="instagram" defaultValue={merchant?.instagram || ""} placeholder="@username" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium outline-none focus:border-blue-500" />
              </div>
           </div>

           <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">Save Changes</button>
           </div>
        </form>
      </div>
    </div>
  );
}