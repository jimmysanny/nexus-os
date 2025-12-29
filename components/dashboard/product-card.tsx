"use client";

import { MoreVertical, Edit, Trash, Copy, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  isPublished: boolean;
}

export const ProductCard = ({ id, name, price, isPublished }: ProductCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      if (!confirm("Are you sure? This funnel will be gone forever.")) return;
      setIsDeleting(true);
      await axios.delete("/api/products/" + id);
      toast.success("Funnel deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete funnel");
    } finally {
      setIsDeleting(false);
    }
  };

  const onDuplicate = async () => {
    try {
      toast.loading("Duplicating funnel...");
      // Logic to clone the product in the DB
      await axios.post("/api/products/" + id + "/duplicate");
      toast.success("Funnel duplicated!");
      router.refresh();
    } catch {
      toast.error("Failed to duplicate funnel");
    }
  };

  return (
    <div className="group relative bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition shadow-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold border border-indigo-500/20">
          {name.charAt(0).toUpperCase()}
        </div>
        
        {/* WORKING THREE-DOT MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#161B22] border-slate-700 text-slate-200">
            <Link href={"/dashboard/funnels/" + id}>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={onDuplicate} className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate Funnel
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              disabled={isDeleting}
              className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:text-red-500 focus:bg-red-500/10 border-t border-slate-700 mt-1"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />}
              Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-white truncate">{name}</h3>
        <div className="flex items-center gap-3">
          <span className={	ext-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider }>
            {isPublished ? "Live" : "Draft"}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {price === 0 ? "FREE" : "KES " + price}
          </span>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800/50 flex items-center justify-between">
        <Link 
          href={"/checkout/" + id}
          target="_blank"
          className="text-[11px] font-medium text-slate-500 hover:text-indigo-400 flex items-center gap-1.5 transition"
        >
          <ExternalLink className="h-3 w-3" />
          Visit Funnel
        </Link>
        <span className="text-[10px] text-slate-600 font-mono">ID: {id.slice(-4)}</span>
      </div>
    </div>
  );
};