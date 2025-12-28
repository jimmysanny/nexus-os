import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function NewFunnelPage() {
  // SERVER ACTION: Defined inline to ensure perfect type compatibility
  async function createFunnel(formData: FormData) {
    "use server";
    
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!name) return;

    // Create the Funnel in DB
    await prisma.funnel.create({
      data: {
        userId,
        name,
        description: description || "",
        price: 0,          // Default price
        currency: "KES",   // Default currency
        headline: ["Welcome to my page"],
        published: true
      }
    });

    // Redirect back to dashboard
    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Funnel</h1>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <form action={createFunnel} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Funnel Name</label>
            <input 
              name="name"
              type="text" 
              required
              placeholder="e.g. My Masterclass"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Description (Optional)</label>
            <textarea 
              name="description"
              placeholder="What are you selling?"
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all"
          >
            Create Funnel
          </button>

        </form>
      </div>
    </div>
  );
}