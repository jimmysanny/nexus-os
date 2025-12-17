"use client";
import { useState, useEffect, use } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, ArrowLeft, Type, Image as ImageIcon, CreditCard, Video, GripVertical, Trash2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { saveFunnel, getFunnel } from "@/app/actions/funnel";

// --- DRAG & DROP ITEM (Now Editable!) ---
function SortableItem({ id, type, data, onUpdate, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-4 relative group hover:border-blue-500 transition">
      
      {/* Drag Handle */}
      <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white p-2 cursor-grab active:cursor-grabbing">
        <GripVertical size={20} />
      </div>

      {/* Delete Button */}
      <button onClick={() => onDelete(id)} className="absolute right-4 top-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition z-10">
        <Trash2 size={18} />
      </button>
      
      {/* Editable Content */}
      <div className="pl-12 pr-8">
        
        {type === 'hero' && (
            <div className="text-center py-6 border-2 border-dashed border-gray-800 rounded-lg">
                <input 
                    type="text" 
                    className="bg-transparent text-2xl font-bold text-white text-center w-full border-b border-transparent focus:border-blue-500 outline-none placeholder-gray-600 mb-2"
                    placeholder="Type Headline Here..."
                    value={data?.title || ""}
                    onChange={(e) => onUpdate(id, { ...data, title: e.target.value })}
                />
                <input 
                    type="text" 
                    className="bg-transparent text-gray-400 text-sm text-center w-full border-b border-transparent focus:border-blue-500 outline-none placeholder-gray-700"
                    placeholder="Type sub-headline description here..."
                    value={data?.subtitle || ""}
                    onChange={(e) => onUpdate(id, { ...data, subtitle: e.target.value })}
                />
            </div>
        )}

        {type === 'checkout' && (
            <div className="bg-white text-black p-4 rounded-lg text-center max-w-xs mx-auto shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2 font-bold"><CreditCard size={16}/> Checkout</div>
                <input 
                    type="number" 
                    className="bg-gray-100 text-black text-center w-full p-2 rounded border border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="Price (KES)"
                    value={data?.price || ""}
                    onChange={(e) => onUpdate(id, { ...data, price: e.target.value })}
                />
            </div>
        )}

        {type === 'text' && (
            <div className="p-4 border border-gray-700 rounded bg-gray-800">
                <textarea 
                    className="bg-transparent text-gray-300 w-full resize-none outline-none border-none placeholder-gray-600 h-20"
                    placeholder="Type your sales paragraph here..."
                    value={data?.content || ""}
                    onChange={(e) => onUpdate(id, { ...data, content: e.target.value })}
                />
            </div>
        )}

        {type === 'video' && (
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700 relative">
                <Video size={32} className="text-gray-600 mb-2" />
                <span className="absolute bottom-2 text-xs text-gray-500">Video Placeholder</span>
            </div>
        )}

      </div>
    </div>
  );
}

// --- MAIN EDITOR ---
export default function FunnelEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load Data
  useEffect(() => {
    async function load() {
       try {
         const data = await getFunnel(id);
         if (data && Array.isArray(data.blocks)) {
            setBlocks(data.blocks as any[]);
         } else {
            setBlocks([{ id: "1", type: "hero", data: { title: "Welcome!", subtitle: "Edit this text" } }]); 
         }
       } catch(e) { console.error(e); }
       setLoading(false);
    }
    load();
  }, [id]);

  const addBlock = (type: string) => setBlocks([...blocks, { id: crypto.randomUUID(), type, data: {} }]);
  const removeBlock = (id: string) => setBlocks(blocks.filter(b => b.id !== id));
  
  // New: Function to update text inside blocks
  const updateBlock = (id: string, newData: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, data: newData } : b));
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

  const handleSave = async () => {
    setSaving(true);
    try {
        await saveFunnel(id, blocks, "My Funnel");
        alert("✅ Saved Successfully!");
    } catch(e) {
        alert("❌ Error: " + e);
    }
    setSaving(false);
  };

  if(loading) return <div className="h-screen bg-black flex items-center justify-center text-white gap-2"><Loader2 className="animate-spin"/> Loading Editor...</div>

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-72 border-r border-gray-800 bg-gray-950 flex flex-col z-20">
        <div className="p-6 border-b border-gray-800">
            <Link href="/dashboard/funnels" className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mb-6">
                <ArrowLeft size={16}/> Back
            </Link>
            <h2 className="font-bold text-xl">Tools</h2>
        </div>
        
        <div className="p-6 grid grid-cols-1 gap-3 overflow-y-auto">
            <button onClick={() => addBlock('hero')} className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-xl transition">
                <Type className="text-blue-500" size={20}/> <span className="text-sm font-bold">Headline</span>
            </button>
            <button onClick={() => addBlock('text')} className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 hover:border-orange-500 rounded-xl transition">
                <ImageIcon className="text-orange-500" size={20}/> <span className="text-sm font-bold">Paragraph</span>
            </button>
            <button onClick={() => addBlock('checkout')} className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 hover:border-green-500 rounded-xl transition">
                <CreditCard className="text-green-500" size={20}/> <span className="text-sm font-bold">Checkout</span>
            </button>
        </div>
      </div>

      {/* CANVAS */}
      <div className="flex-1 flex flex-col relative bg-black">
        <header className="h-16 border-b border-gray-800 flex items-center justify-end px-8 bg-black/80 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <a href={`/f/${id}`} target="_blank" className="text-sm font-bold text-gray-400 hover:text-white flex gap-2">
                    Preview <ExternalLink size={14}/>
                </a>
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition">
                    {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} 
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
            <div className="max-w-2xl mx-auto pb-40">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                        {blocks.map(block => (
                            <SortableItem 
                                key={block.id} 
                                id={block.id} 
                                type={block.type} 
                                data={block.data} 
                                onUpdate={updateBlock} 
                                onDelete={removeBlock} 
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
      </div>
    </div>
  );
}