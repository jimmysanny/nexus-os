const fs = require('fs');
const path = require('path');

console.log("🚀 Upgrading Nexus OS Memory Logic...");

const files = {
  // WE ARE RE-WRITING THE EDITOR FILE WITH THE NEW 'useParams' LOGIC
  'app/dashboard/funnels/[id]/page.tsx': `"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // <--- NEW: The GPS Hook
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, ArrowLeft, Type, Image as ImageIcon, CreditCard, Video, GripVertical, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase"; 
import PaystackWrapper from "@/components/PaystackWrapper"; 

// --- Components (Standard) ---
function SortableItem({ id, type, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  // Paystack Config
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: "customer@example.com",
    amount: 5000 * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    currency: 'KES',
    text: "Pay KES 5,000",
    onSuccess: (reference: any) => alert("Payment Complete! Ref: " + reference.reference),
    onClose: () => alert("Payment window closed"),
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 relative group hover:border-blue-500 transition cursor-default">
      <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white cursor-grab p-2"><GripVertical size={20} /></div>
      <button onClick={() => onDelete(id)} className="absolute right-4 top-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={18} /></button>
      <div className="pl-10">
        {type === 'hero' && <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-lg"><h1 className="text-4xl font-bold text-white mb-4">Master Your Digital Growth</h1><p className="text-gray-400">Join the exclusive program today.</p></div>}
        {type === 'checkout' && <div className="bg-white text-black p-6 rounded-lg text-center max-w-sm mx-auto shadow-xl"><h3 className="font-bold text-xl mb-2">Premium Masterclass</h3><p className="mb-4 text-gray-600">Lifetime Access • KES 5,000</p><div className="w-full"><PaystackWrapper {...paystackConfig} className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded font-bold transition" /></div><p className="text-xs text-gray-400 mt-2">Secured by Paystack</p></div>}
        {type === 'video' && <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700"><Video size={48} className="text-gray-600" /></div>}
        {type === 'text' && <div className="prose prose-invert max-w-none"><p>Include your sales copy here. Explain the value of your offer.</p></div>}
      </div>
    </div>
  );
}

// --- MAIN EDITOR ---
export default function FunnelEditor() {
  const params = useParams(); // <--- GRAB ID SAFELY
  const id = params?.id as string; // Ensure it's a string

  const [blocks, setBlocks] = useState([{ id: "1", type: "hero" }, { id: "3", type: "checkout" }]);
  const [saving, setSaving] = useState(false);

  // Load Data on Start
  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "funnels", id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.blocks) setBlocks(data.blocks);
                console.log("Loaded funnel data");
            }
        } catch(e) {
            console.error("Error loading:", e);
        }
    };
    loadData();
  }, [id]);

  const addBlock = (type: string) => setBlocks([...blocks, { id: Date.now().toString(), type }]);
  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));
  
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const saveFunnel = async () => {
    if (!id) {
        alert("Error: No Funnel ID found. Try refreshing.");
        return;
    }
    setSaving(true);
    try {
        await setDoc(doc(db, "funnels", id), {
            blocks: blocks,
            updatedAt: new Date(),
            name: "My Funnel " + id
        });
        alert("✅ Funnel Saved to Cloud!");
    } catch (e) {
        console.error(e);
        alert("Error saving: " + e);
    }
    setSaving(false);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-80 border-r border-gray-800 p-6 bg-gray-950 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard" className="text-gray-400 hover:text-white"><ArrowLeft size={20}/></Link>
            <h2 className="font-bold text-lg">Funnel Editor</h2>
        </div>
        <p className="text-xs font-bold text-gray-500 uppercase mb-4">Components</p>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => addBlock('hero')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2"><Type size={24} className="text-blue-500" /><span className="text-xs font-medium">Hero</span></button>
            <button onClick={() => addBlock('checkout')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2"><CreditCard size={24} className="text-green-500" /><span className="text-xs font-medium">Checkout</span></button>
            <button onClick={() => addBlock('video')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2"><Video size={24} className="text-purple-500" /><span className="text-xs font-medium">Video</span></button>
            <button onClick={() => addBlock('text')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2"><ImageIcon size={24} className="text-orange-500" /><span className="text-xs font-medium">Text/Img</span></button>
        </div>
      </div>
      <div className="flex-1 bg-black p-10 overflow-auto flex justify-center">
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">Live Preview</span>
                <button onClick={saveFunnel} disabled={saving} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition">
                    {saving ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>} 
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
            <div className="bg-black border border-gray-800 min-h-[80vh] rounded-xl p-8 shadow-2xl">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                        {blocks.map(block => <SortableItem key={block.id} id={block.id} type={block.type} onDelete={removeBlock} />)}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) fs.mkdirSync(dirName, { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log("Updated file: " + filePath);
});

console.log("\n✅ Memory Logic Upgraded!");
console.log("👉 Restart your server: npm run dev");