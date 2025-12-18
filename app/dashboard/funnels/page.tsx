import Link from "next/link";
import { Plus, Globe, MoreVertical, Loader2, BarChart3, Trash2 } from "lucide-react";
import { getFunnels, deleteFunnel } from "@/app/actions/funnel";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function FunnelsList() {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const funnels = await getFunnels();
  // Filter out corrupted IDs
  const validFunnels = funnels.filter((f: any) => f.id && !f.id.startsWith("["));

  return (
    <div className="p-8 text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Funnels</h1>
          <p className="text-gray-400">Manage your landing pages and sales flows.</p>
        </div>
        <Link href="/dashboard/new" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2">
           <Plus size={20} /> Create Funnel
        </Link>
      </div>

      {validFunnels.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-xl border-dashed">
          <h3 className="text-xl font-bold text-gray-500 mb-2">No funnels found</h3>
          <p className="text-gray-600 mb-6">Click the button above to start building.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {validFunnels.map((funnel: any) => (
            <div key={funnel.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition relative group">
                <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-900/20 text-blue-500 rounded-lg flex items-center justify-center">
                        <Globe size={24} />
                    </div>
                    {/* DELETE BUTTON */}
                    <form action={deleteFunnel.bind(null, funnel.id)}>
                        <button type="submit" className="text-gray-600 hover:text-red-500 transition">
                            <Trash2 size={20} />
                        </button>
                    </form>
                </div>
                
                <h3 className="text-xl font-bold mb-1 text-white truncate">{funnel.name}</h3>
                <p className="text-xs text-gray-500 mb-6">Created: {new Date(funnel.createdAt).toLocaleDateString()}</p>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Link href={'/dashboard/funnels/' + funnel.id} className="block text-center bg-gray-800 hover:bg-gray-700 text-white py-2 rounded font-medium transition text-sm">
                        Edit
                    </Link>
                    <a href={'/f/' + funnel.id} target="_blank" className="block text-center border border-gray-700 hover:bg-gray-800 text-gray-300 py-2 rounded font-medium transition text-sm">
                        View Live
                    </a>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
