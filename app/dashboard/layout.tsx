import DashboardNav from "@/components/DashboardNav";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">N</div>
              <span className="font-bold text-slate-900 tracking-tight">Nexus OS</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pro</span>
           </div>
           <DashboardNav />
           <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                 <p className="text-xs font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                 <p className="text-[10px] text-slate-400">Merchant Account</p>
              </div>
              <img src={user.imageUrl} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" />
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}