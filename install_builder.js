const fs = require('fs');
const path = require('path');

console.log("🚀 Installing Nexus Funnel Builder...");

const files = {
  // 1. The Funnel List Page (My Funnels)
  'app/dashboard/funnels/page.tsx': `"use client";
import Link from "next/link";
import { Plus, Globe, MoreVertical } from "lucide-react";

export default function FunnelsList() {
  const funnels = [
    { id: "1", name: "Webinar Waitlist", visits: 120, revenue: "KES 0" },
    { id: "2", name: "Masterclass Sales", visits: 850, revenue: "KES 45,000" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Funnels</h1>
          <p className="text-gray-400">Manage your landing pages and sales flows.</p>
        </div>
        <Link href="/dashboard/funnels/new" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2">
            <Plus size={20} /> Create Funnel
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funnels.map(funnel => (
            <div key={funnel.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition relative group">
                <div className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-white"><MoreVertical size={20}/></div>
                <div className="w-12 h-12 bg-blue-900/20 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-1">{funnel.name}</h3>
                <div className="flex gap-4 text-sm text-gray-400 mt-4 pt-4 border-t border-gray-800">
                    <span>👀 {funnel.visits} Visits</span>
                    <span className="text-green-500">💰 {funnel.revenue}</span>
                </div>
                <Link href={\`/dashboard/funnels/\${funnel.id}\`} className="mt-4 block text-center bg-gray-800 hover:bg-gray-700 py-2 rounded font-medium transition">
                    Edit Design
                </Link>
            </div>
        ))}
      </div>
    </div>
  );
}`,

  // 2. The Drag-and-Drop Editor
  'app/dashboard/funnels/[id]/page.tsx': `"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, ArrowLeft, Type, Image as ImageIcon, CreditCard, Video, GripVertical, Trash2 } from "lucide-react";
import Link from "next/link";

// --- Components for the Canvas ---

function SortableItem({ id, type, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 relative group hover:border-blue-500 transition cursor-default">
      {/* Drag Handle */}
      <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white cursor-grab p-2">
        <GripVertical size={20} />
      </div>

      {/* Delete Button */}
      <button onClick={() => onDelete(id)} className="absolute right-4 top-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
        <Trash2 size={18} />
      </button>
      
      {/* Content based on Type */}
      <div className="pl-10">
        {type === 'hero' && (
            <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-lg">
                <h1 className="text-4xl font-bold text-white mb-4">Edit Headline Here</h1>
                <p className="text-gray-400">Drag to reorder this Hero Section.</p>
            </div>
        )}
        {type === 'checkout' && (
            <div className="bg-white text-black p-6 rounded-lg text-center max-w-sm mx-auto">
                <h3 className="font-bold text-xl mb-2">Premium Product</h3>
                <p className="mb-4 text-gray-600">KES 5,000</p>
                <button className="bg-green-600 text-white w-full py-3 rounded font-bold">Pay Now (Demo)</button>
            </div>
        )}
        {type === 'video' && (
             <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700">
                <Video size={48} className="text-gray-600" />
             </div>
        )}
        {type === 'text' && (
            <div className="prose prose-invert max-w-none">
                <p>Add your sales copy, testimonials, or product description here.</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default function FunnelEditor({ params }: any) {
  const [blocks, setBlocks] = useState([
    { id: "1", type: "hero" },
    { id: "2", type: "text" },
    { id: "3", type: "checkout" }
  ]);

  const addBlock = (type: string) => {
    setBlocks([...blocks, { id: Date.now().toString(), type }]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
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

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Sidebar - Tools */}
      <div className="w-80 border-r border-gray-800 p-6 bg-gray-950 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard" className="text-gray-400 hover:text-white"><ArrowLeft size={20}/></Link>
            <h2 className="font-bold text-lg">Funnel Editor</h2>
        </div>

        <p className="text-xs font-bold text-gray-500 uppercase mb-4">Components</p>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => addBlock('hero')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2">
                <Type size={24} className="text-blue-500" />
                <span className="text-xs font-medium">Hero</span>
            </button>
            <button onClick={() => addBlock('checkout')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2">
                <CreditCard size={24} className="text-green-500" />
                <span className="text-xs font-medium">Checkout</span>
            </button>
            <button onClick={() => addBlock('video')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2">
                <Video size={24} className="text-purple-500" />
                <span className="text-xs font-medium">Video</span>
            </button>
            <button onClick={() => addBlock('text')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition text-center flex flex-col items-center gap-2">
                <ImageIcon size={24} className="text-orange-500" />
                <span className="text-xs font-medium">Text/Img</span>
            </button>
        </div>
      </div>

      {/* Main Canvas - Preview */}
      <div className="flex-1 bg-black p-10 overflow-auto flex justify-center">
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">Live Preview</span>
                <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
                    <Save size={16}/> Save Changes
                </button>
            </div>

            <div className="bg-black border border-gray-800 min-h-[80vh] rounded-xl p-8 shadow-2xl">
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                        {blocks.map(block => (
                            <SortableItem key={block.id} id={block.id} type={block.type} onDelete={removeBlock} />
                        ))}
                    </SortableContext>
                </DndContext>
                
                {blocks.length === 0 && (
                    <div className="text-center py-20 text-gray-600 border-2 border-dashed border-gray-800 rounded-xl">
                        <p>Your funnel is empty.</p>
                        <p>Click a component on the left to add it.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
    console.log("Created folder: " + dirName);
  }
  fs.writeFileSync(filePath, content);
  console.log("Created file: " + filePath);
});

console.log("\n✅ Funnel Builder Installed!");