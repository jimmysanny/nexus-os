"use client";
import { MoreVertical, Edit, Trash, Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const ProductCard = ({ id, name, price, isPublished }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!confirm("Delete this?")) return;
    try { setLoading(true); await axios.delete("/api/products/" + id); toast.success("Deleted"); router.refresh(); } 
    catch { toast.error("Error"); } finally { setLoading(false); }
  };
  const onDuplicate = async () => {
    try { setLoading(true); await axios.post("/api/products/" + id + "/duplicate"); toast.success("Duplicated"); router.refresh(); } 
    catch { toast.error("Error"); } finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition relative">
      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold border border-indigo-500/20">{name.charAt(0).toUpperCase()}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0 text-slate-400"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#161B22] border-slate-700 text-slate-200">
            <Link href={"/dashboard/funnels/" + id}><DropdownMenuItem className="cursor-pointer"><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem></Link>
            <DropdownMenuItem onClick={onDuplicate} className="cursor-pointer"><Copy className="h-4 w-4 mr-2" />Duplicate</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-red-500 cursor-pointer"><Trash className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="font-semibold text-white truncate">{name}</h3>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-slate-400">KES {price}</span>
        {isPublished && <span className="text-[10px] text-green-400 border border-green-500/20 px-1 rounded">LIVE</span>}
      </div>
    </div>
  );
};