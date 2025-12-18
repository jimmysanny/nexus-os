import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFunnels } from "@/app/actions/funnel";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BarChart3, Globe, MousePointerClick, Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const funnels = await getFunnels();
  const totalVisits = funnels.reduce((acc: number, curr: any) => acc + (curr.visits || 0), 0);
  const liveFunnels = funnels.filter((f: any) => f.published).length;

  return (
    <div className="p-8 text-white min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back to Nexus OS.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-900/20 rounded-lg text-blue-500">
                    <Globe size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Total Funnels</p>
                    <h3 className="text-2xl font-bold">{funnels.length}</h3>
                </div>
            </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-green-900/20 rounded-lg text-green-500">
                    <MousePointerClick size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Total Visits</p>
                    <h3 className="text-2xl font-bold">{totalVisits}</h3>
                </div>
            </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-900/20 rounded-lg text-purple-500">
                    <BarChart3 size={24} />
                </div>
                <div>
                    <p className="text-gray-400 text-sm">Conversion Rate</p>
                    <h3 className="text-2xl font-bold">0%</h3>
                </div>
            </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="p-8 bg-gray-900 border border-dashed border-gray-800 rounded-xl flex flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold mb-2">Start a New Project</h3>
        <p className="text-gray-400 mb-6 max-w-md">Create a high-converting landing page in minutes.</p>
        <Link href="/dashboard/funnels" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2">
            <Plus size={20} /> Go to My Funnels
        </Link>
      </div>
    </div>
  );
}

// Minimal Card Components to prevent import errors if they are missing
function Card({children, className}: any) { return <div className={className}>{children}</div> }
function CardHeader({children}: any) { return <div className="mb-2">{children}</div> }
function CardTitle({children}: any) { return <h3 className="font-bold">{children}</h3> }
function CardContent({children}: any) { return <div>{children}</div> }
