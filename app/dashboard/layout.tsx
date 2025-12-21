import DashboardNav from "@/components/DashboardNav";
import { UserButton } from "@clerk/nextjs"; 
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation Bar - Sticky & Frosted Glass Effect */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
           {/* Logo & Brand */}
           <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-slate-300">N</div>
                 <span className="font-bold text-slate-900 tracking-tight text-lg">Nexus OS</span>
                 <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100">Pro</span>
              </div>
              {/* Mobile Profile Menu (Visible only on mobile) */}
              <div className="md:hidden">
                 <UserButton afterSignOutUrl="/" />
              </div>
           </div>

           {/* Navigation Tabs (Scrollable on Mobile) */}
           <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
              <DashboardNav />
           </div>

           {/* Desktop Profile Menu */}
           <div className="hidden md:flex items-center gap-4 border-l border-slate-200 pl-6">
              <div className="text-right">
                 <p className="text-xs font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                 <p className="text-[10px] text-slate-400 font-medium">Merchant Account</p>
              </div>
              <UserButton afterSignOutUrl="/" />
           </div>
        </div>
      </div>

      {/* Main Content Area - Centered & Spacious */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}