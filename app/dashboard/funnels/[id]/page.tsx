"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CouponManager from "@/components/CouponManager";

export default function EditFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use() or await in async component. 
  // Since this is "use client", we use the "use" hook or standard unwrapping if passed as prop.
  // For safety in Next 15, we will unwrap it inside useEffect or use standard fetch pattern.
  const resolvedParams = use(params);
  
  const [funnel, setFunnel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/funnels/${resolvedParams.id}`).then(res => res.json()).then(data => {
      setFunnel(data);
      setLoading(false);
    });
  }, [resolvedParams.id]);

  const save = async () => {
    await fetch(`/api/funnels/${resolvedParams.id}`, {
      method: "PATCH",
      body: JSON.stringify(funnel)
    });
    alert("Saved!");
    router.refresh();
  };

  if (loading) return <div className="p-20 font-bold text-slate-400">Loading editor...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-xs font-bold text-slate-400">← Back</Link>
        <h1 className="text-2xl font-black text-slate-900">Product Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</label>
            <input 
              value={funnel.name} 
              onChange={(e) => setFunnel({ ...funnel, name: e.target.value })}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
            <select 
              value={funnel.category || "Other"} 
              onChange={(e) => setFunnel({ ...funnel, category: e.target.value })}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none"
            >
              <option value="Other">Other</option>
              <option value="Software">Software / SaaS</option>
              <option value="E-books">E-books & Guides</option>
              <option value="Templates">Templates (Notion, Canva)</option>
              <option value="Courses">Online Courses</option>
              <option value="Graphics">Graphics & Design</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price (KES)</label>
            <input 
              type="number" 
              value={funnel.price} 
              onChange={(e) => setFunnel({ ...funnel, price: e.target.value })}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</label>
            <textarea 
              value={funnel.description || ""} 
              onChange={(e) => setFunnel({ ...funnel, description: e.target.value })}
              className="w-full p-4 bg-slate-50 rounded-2xl font-medium text-slate-600 outline-none h-32"
            />
          </div>
           <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Download URL (The Asset)</label>
            <input 
              value={funnel.digitalProductUrl || ""} 
              onChange={(e) => setFunnel({ ...funnel, digitalProductUrl: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="w-full p-4 bg-blue-50 rounded-2xl font-bold text-blue-700 outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-between">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={funnel.published} 
                onChange={(e) => setFunnel({ ...funnel, published: e.target.checked })}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-xs font-bold text-slate-900">Publish to Store</span>
            </label>
            <button onClick={save} className="px-8 py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600">
              Save Changes
            </button>
          </div>
        </div>

        {/* MARKETING TOOLS */}
        <div className="space-y-6">
           <CouponManager funnelId={funnel.id} coupons={funnel.coupons || []} />
        </div>
      </div>
    </div>
  );
}