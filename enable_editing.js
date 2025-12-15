const fs = require('fs');

console.log("🚀 Upgrading Nexus to Dynamic Content Mode...");

const files = {
  // 1. THE EDITOR (Now with Input Fields)
  'app/dashboard/funnels/[id]/page.tsx': `"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, ArrowLeft, Trash2, GripVertical, Loader2 } from "lucide-react";
import Link from "next/link";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "@/lib/firebase"; 

// --- Editable Block Component ---
function SortableItem({ id, type, content, onUpdate, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const data = content || {}; // Handle empty data

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 relative group hover:border-blue-500 transition">
      
      {/* Drag Handle */}
      <div {...attributes} {...listeners} className="absolute left-3 top-6 text-gray-600 hover:text-white cursor-grab p-2">
        <GripVertical size={20} />
      </div>

      {/* Delete Button */}
      <button onClick={() => onDelete(id)} className="absolute right-4 top-4 text-gray-600 hover:text-red-500 transition z-10">
        <Trash2 size={18} />
      </button>

      <div className="pl-10 space-y-4">
        <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">{type} Block</span>
        
        {/* HERO EDITING */}
        {type === 'hero' && (
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Headline (e.g., The Nexus Blueprint)" 
              className="w-full bg-black border border-gray-700 p-3 rounded-lg text-xl font-bold text-white focus:border-blue-500 focus:outline-none"
              value={data.headline || ""}
              onChange={(e) => onUpdate(id, { ...data, headline: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Subheadline" 
              className="w-full bg-black border border-gray-700 p-3 rounded-lg text-gray-400 focus:border-blue-500 focus:outline-none"
              value={data.subheadline || ""}
              onChange={(e) => onUpdate(id, { ...data, subheadline: e.target.value })}
            />
          </div>
        )}

        {/* CHECKOUT EDITING */}
        {type === 'checkout' && (
          <div className="space-y-3 p-4 bg-white rounded-lg text-black">
            <input 
              type="text" 
              placeholder="Product Name" 
              className="w-full bg-gray-100 border border-gray-300 p-2 rounded font-bold text-black focus:border-green-500 focus:outline-none"
              value={data.productName || ""}
              onChange={(e) => onUpdate(id, { ...data, productName: e.target.value })}
            />
            <div className="flex gap-2 items-center">
                <span className="font-bold">KES</span>
                <input 
                type="number" 
                placeholder="Price" 
                className="w-32 bg-gray-100 border border-gray-300 p-2 rounded text-black focus:border-green-500 focus:outline-none"
                value={data.price || ""}
                onChange={(e) => onUpdate(id, { ...data, price: e.target.value })}
                />
            </div>
            <div className="bg-green-600 text-white text-center py-2 rounded font-bold opacity-80 cursor-not-allowed">
                Pay Button Preview
            </div>
          </div>
        )}

        {/* TEXT EDITING */}
        {type === 'text' && (
            <textarea 
                placeholder="Type your sales copy here..." 
                className="w-full bg-black border border-gray-700 p-3 rounded-lg text-gray-300 h-32 focus:border-blue-500 focus:outline-none"
                value={data.text || ""}
                onChange={(e) => onUpdate(id, { ...data, text: e.target.value })}
            />
        )}
      </div>
    </div>
  );
}

// --- MAIN EDITOR ---
export default function FunnelEditor() {
  const params = useParams();
  const id = params?.id as string;
  const [blocks, setBlocks] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
        try {
            const docSnap = await getDoc(doc(db, "funnels", id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.blocks) setBlocks(data.blocks);
            } else {
                // Default starter blocks
                setBlocks([
                    { id: "1", type: "hero", content: { headline: "Master Your Digital Growth", subheadline: "Join the exclusive program today." } },
                    { id: "2", type: "checkout", content: { productName: "Premium Masterclass", price: "5000" } }
                ]);
            }
        } catch(e) { console.error(e); }
    };
    loadData();
  }, [id]);

  const addBlock = (type: string) => setBlocks([...blocks, { id: Date.now().toString(), type, content: {} }]);
  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));
  
  const updateBlock = (id: string, newContent: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent } : b));
  };

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
    if (!id) return;
    setSaving(true);
    try {
        await setDoc(doc(db, "funnels", id), {
            blocks: blocks,
            updatedAt: new Date(),
            name: "My Funnel " + id
        });
        alert("✅ Content Updated!");
    } catch (e) { alert("Error: " + e); }
    setSaving(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-80 border-r border-gray-800 p-6 bg-gray-950 flex flex-col z-20">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard" className="text-gray-400 hover:text-white"><ArrowLeft size={20}/></Link>
            <h2 className="font-bold text-lg">Editor</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-auto">
            <button onClick={() => addBlock('hero')} className="p-4 bg-gray-900 border border-gray-800 hover:bg-gray-800 rounded-lg text-xs font-bold">Header</button>
            <button onClick={() => addBlock('text')} className="p-4 bg-gray-900 border border-gray-800 hover:bg-gray-800 rounded-lg text-xs font-bold">Text</button>
            <button onClick={() => addBlock('checkout')} className="p-4 bg-gray-900 border border-gray-800 hover:bg-gray-800 rounded-lg text-xs font-bold text-green-400">Checkout</button>
        </div>
        <button onClick={saveFunnel} disabled={saving} className="bg-blue-600 hover:bg-blue-500 w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20}/>} 
            {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 bg-black p-10 overflow-y-auto">
        <div className="max-w-2xl mx-auto pb-40">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                    {blocks.map(block => (
                        <SortableItem 
                            key={block.id} 
                            id={block.id} 
                            type={block.type} 
                            content={block.content}
                            onUpdate={updateBlock}
                            onDelete={removeBlock} 
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
      </div>
    </div>
  );
}`,

  // 2. THE PUBLIC VIEWER (Reads your custom text)
  'app/f/[id]/page.tsx': `"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PaystackWrapper from "@/components/PaystackWrapper";
import { Loader2, CheckCircle, Video } from "lucide-react";

export default function PublicFunnelPage() {
  const params = useParams();
  const id = params?.id as string;
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "funnels", id));
        if (docSnap.exists()) {
          setBlocks(docSnap.data().blocks || []);
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-blue-500"><Loader2 className="animate-spin" size={48} /></div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {blocks.map((block) => (
        <div key={block.id} className="w-full">
            
            {/* HERO */}
            {block.type === 'hero' && (
                <div className="py-20 px-6 text-center bg-gradient-to-b from-gray-900 to-black">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            {block.content?.headline || "Master Your Digital Growth"}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            {block.content?.subheadline || "Join the exclusive program today."}
                        </p>
                    </div>
                </div>
            )}

            {/* CHECKOUT */}
            {block.type === 'checkout' && (
                <div className="py-12 px-6">
                    <div className="max-w-md mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                        <div className="flex justify-center mb-6 text-green-500"><CheckCircle size={48} /></div>
                        <h3 className="font-bold text-2xl text-center mb-2">
                            {block.content?.productName || "Premium Masterclass"}
                        </h3>
                        <p className="text-center text-gray-400 mb-8">
                            Lifetime Access • KES {block.content?.price || "5000"}
                        </p>
                        <div className="w-full">
                            <PaystackWrapper 
                                email="customer@example.com"
                                amount={(parseInt(block.content?.price) || 5000) * 100}
                                publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""}
                                currency="KES"
                                text={"Pay KES " + (block.content?.price || "5000")}
                                className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-xl font-bold text-lg transition"
                                onSuccess={() => alert("Payment Successful!")}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* TEXT */}
            {block.type === 'text' && (
                <div className="py-12 px-6">
                    <div className="max-w-2xl mx-auto prose prose-invert prose-lg text-gray-300 whitespace-pre-wrap">
                        {block.content?.text || "Insert your text here."}
                    </div>
                </div>
            )}

             {/* VIDEO */}
            {block.type === 'video' && (
                <div className="py-12 px-6 bg-gray-950">
                    <div className="max-w-4xl mx-auto aspect-video bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800">
                        <Video size={64} className="text-gray-700" />
                    </div>
                </div>
            )}
        </div>
      ))}
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-gray-900 mt-12"><p>Powered by Nexus Africa</p></footer>
    </div>
  );
}`;

Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content);
  console.log("Updated file: " + filePath);
});

console.log("\n✅ Editing Unlocked!");
console.log("👉 Restart your server if needed, then refresh the page.");