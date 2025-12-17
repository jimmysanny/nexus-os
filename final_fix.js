const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Nexus OS Final Fix...");

// --- 1. UPDATE PRISMA SCHEMA ---
const schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Funnel {
  id          String   @id @default(uuid())
  userId      String
  name        String
  description String?
  blocks      Json     @default("[]")
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Product {
  id        String   @id @default(uuid())
  userId    String
  name      String
  price     Float
  currency  String   @default("KES")
  createdAt DateTime @default(now())
}`;

const prismaDir = path.join(process.cwd(), 'prisma');
if (!fs.existsSync(prismaDir)) fs.mkdirSync(prismaDir, { recursive: true });
fs.writeFileSync(path.join(prismaDir, 'schema.prisma'), schemaContent);
console.log("✅ Prisma Schema Updated");


// --- 2. CREATE SERVER ACTIONS ---
const actionsDir = path.join(process.cwd(), 'app', 'actions');
if (!fs.existsSync(actionsDir)) fs.mkdirSync(actionsDir, { recursive: true });

const actionsContent = `'use server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs/server'

const prisma = new PrismaClient()

export async function getFunnel(id: string) {
  const { userId } = await auth()
  if (!userId) return null
  
  const funnel = await prisma.funnel.findUnique({
    where: { id }
  })
  
  if (funnel && funnel.userId !== userId) return null
  return funnel
}

export async function saveFunnel(id: string, blocks: any[], name: string = "Untitled Funnel") {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  return await prisma.funnel.upsert({
    where: { id },
    update: { 
      blocks: blocks,
      updatedAt: new Date()
    },
    create: {
      id,
      userId,
      name,
      blocks: blocks,
      published: false
    }
  })
}`;
fs.writeFileSync(path.join(actionsDir, 'funnel.ts'), actionsContent);
console.log("✅ Server Actions Created");


// --- 3. REWRITE EDITOR ---
const editorPath = path.join(process.cwd(), 'app', 'dashboard', 'funnels', '[id]', 'page.tsx');
const editorContent = `"use client";
import { useState, useEffect, use } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Save, ArrowLeft, Type, Image as ImageIcon, CreditCard, Video, GripVertical, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { saveFunnel, getFunnel } from "@/app/actions/funnel";

function SortableItem({ id, type, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-4 relative group hover:border-blue-500 transition cursor-default">
      <div {...attributes} {...listeners} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white cursor-grab p-2"><GripVertical size={20} /></div>
      <button onClick={() => onDelete(id)} className="absolute right-4 top-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={18} /></button>
      <div className="pl-10">
        {type === 'hero' && <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-lg"><h1 className="text-4xl font-bold text-white mb-4">Master Your Digital Growth</h1><p className="text-gray-400">Join the exclusive program today.</p></div>}
        {type === 'checkout' && <div className="bg-white text-black p-6 rounded-lg text-center max-w-sm mx-auto shadow-xl"><h3 className="font-bold text-xl mb-2">Premium Masterclass</h3><p className="mb-4 text-gray-600">Lifetime Access • KES 5,000</p><div className="bg-green-600 text-white w-full py-3 rounded font-bold">Pay Now</div><p className="text-xs text-gray-400 mt-2">Secured by Paystack</p></div>}
        {type === 'video' && <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-700"><Video size={48} className="text-gray-600" /></div>}
        {type === 'text' && <div className="prose prose-invert max-w-none"><p>Include your sales copy here. Explain the value of your offer.</p></div>}
      </div>
    </div>
  );
}

export default function FunnelEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
       try {
         const data = await getFunnel(id);
         if (data && Array.isArray(data.blocks)) {
            setBlocks(data.blocks as any[]);
         } else {
            setBlocks([{ id: "1", type: "hero" }, { id: "2", type: "checkout" }]);
         }
       } catch(e) { console.error(e); }
       setLoading(false);
    }
    load();
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

  const handleSave = async () => {
    setSaving(true);
    try {
        await saveFunnel(id, blocks, "Funnel " + id);
        alert("✅ Saved to SQL Database!");
    } catch(e) { alert("Error: " + e); }
    setSaving(false);
  };

  if(loading) return <div className="h-screen bg-black flex items-center justify-center text-white"><Loader2 className="animate-spin"/> Loading...</div>

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-80 border-r border-gray-800 p-6 bg-gray-950 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard" className="text-gray-400 hover:text-white"><ArrowLeft size={20}/></Link>
            <h2 className="font-bold text-lg">Funnel Editor</h2>
        </div>
        <p className="text-xs font-bold text-gray-500 uppercase mb-4">Components</p>
        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => addBlock('hero')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition flex flex-col items-center"><Type size={20} className="text-blue-500 mb-2"/><span className="text-xs">Hero</span></button>
            <button onClick={() => addBlock('checkout')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition flex flex-col items-center"><CreditCard size={20} className="text-green-500 mb-2"/><span className="text-xs">Checkout</span></button>
            <button onClick={() => addBlock('video')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition flex flex-col items-center"><Video size={20} className="text-purple-500 mb-2"/><span className="text-xs">Video</span></button>
            <button onClick={() => addBlock('text')} className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 transition flex flex-col items-center"><ImageIcon size={20} className="text-orange-500 mb-2"/><span className="text-xs">Text</span></button>
        </div>
      </div>
      <div className="flex-1 bg-black p-10 overflow-auto flex justify-center">
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">Prisma SQL Mode</span>
                <button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2 text-sm transition">
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
}`;
fs.writeFileSync(editorPath, editorContent);
console.log("✅ Editor Connected to Prisma");