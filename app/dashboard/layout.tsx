import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  ShieldCheck, 
  User, 
  Globe 
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  // IDENTIFY ROLE
  // Checks if the email matches yours to assign the ADMIN badge
  const isAdmin = user.emailAddresses[0].emailAddress === "jimmysanny01@gmail.com";
  const roleLabel = isAdmin ? "ADMIN (OWNER)" : "CREATOR";
  const roleColor = isAdmin 
    ? "text-rose-400 border-rose-500/20 bg-rose-500/10" 
    : "text-indigo-400 border-indigo-500/20 bg-indigo-500/10";

  return (
    <div className="flex min-h-screen bg-black text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 flex flex-col fixed h-full bg-[#0B0F1A]">
        
        {/* LOGO AREA */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2 mb-1">
             <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
             <span className="font-bold text-xl tracking-tight text-white">NEXUS OS</span>
          </Link>
          
          {/* THE ROLE BADGE (Syntax Fixed) */}
          <div className={"mt-3 text-[10px] font-bold px-2 py-1 rounded border w-fit flex items-center gap-1 " + roleColor}>
            {isAdmin ? <ShieldCheck className="h-3 w-3" /> : <User className="h-3 w-3" />}
            {roleLabel}
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
              <LayoutDashboard className="h-5 w-5" />
              <span>Overview</span>
            </div>
          </Link>
          
          <Link href="/dashboard/funnels">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
              <ShoppingBag className="h-5 w-5" />
              <span>My Funnels</span>
            </div>
          </Link>

          {/* ADMIN ONLY LINK */}
          {isAdmin && (
             <Link href="/market" target="_blank">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-rose-400 hover:text-rose-300 transition">
                <Globe className="h-5 w-5" />
                <span>View Live Market</span>
              </div>
            </Link>
          )}

          <Link href="/dashboard/settings">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </div>
          </Link>
        </nav>

        {/* USER PROFILE AREA */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <UserButton afterSignOutUrl="/" />
            <div className="text-xs">
              <p className="text-white font-medium truncate w-32">{user.firstName} {user.lastName}</p>
              <p className="text-slate-500 truncate w-32">{user.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}