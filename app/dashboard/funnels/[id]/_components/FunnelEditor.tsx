"use client";
import { useState } from "react";
import { Save, ArrowLeft, Loader2, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveFunnel } from "@/app/actions/funnel";
import PaystackWrapper from "@/app/components/PaystackWrapper";

export default function FunnelEditor({ funnelId, initialBlocks, initialName }: any) {
  const router = useRouter();
  const [blocks, setBlocks] = useState(initialBlocks || []);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(initialName || "Untitled Funnel");

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveFunnel(JSON.stringify(blocks), name, funnelId);
      alert(" Saved Successfully!");
      router.refresh();
    } catch (e) {
      alert(" Error Saving: " + e);
    }
    setSaving(false);
  };

  const addBlock = (type: string) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type: type,
      content: type === "hero" ? "Welcome to Nexus" : "1000", 
    };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <nav className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/funnels" className="text-gray-400 hover:text-white transition">
            <ArrowLeft size={20} />
          </Link>
          <input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent text-white font-bold border-none outline-none focus:ring-0" />
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition">
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 border-r border-gray-800 p-4 bg-gray-900 flex flex-col gap-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase">Blocks</h3>
          <button onClick={() => addBlock("hero")} className="p-3 rounded bg-gray-800 hover:bg-gray-700 text-left text-sm text-gray-200 border border-gray-700"> Add Hero Text</button>
          <button onClick={() => addBlock("checkout")} className="p-3 rounded bg-gray-800 hover:bg-gray-700 text-left text-sm text-green-400 border border-gray-700 flex items-center gap-2">
            <CreditCard size={16} /> Add Payment Button
          </button>
        </aside>

        <main className="flex-1 p-10 overflow-y-auto bg-black">
          <div className="max-w-3xl mx-auto min-h-[500px] bg-white text-black rounded-lg shadow-2xl p-8">
            {blocks.length === 0 ? <p className="text-center text-gray-400 mt-20">Select a block to start.</p> : 
              <div className="space-y-6">
                {blocks.map((block: any) => (
                  <div key={block.id} className="p-4 border border-transparent hover:border-blue-500 rounded group">
                    {block.type === 'hero' && <h1 className="text-4xl font-extrabold text-center">{block.content}</h1>}
                    {block.type === 'checkout' && (
                       <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-600 mb-2 font-bold">Product Price: KES {block.content}</p>
                          <PaystackWrapper email="customer@email.com" amount={parseInt(block.content)} />
                       </div>
                    )}
                  </div>
                ))}
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  );
}
