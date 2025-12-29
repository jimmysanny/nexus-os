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
  DropdownMenuSeparator,
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
  const [loading, setLoading] = useState(false);

  // 1. DELETE ACTION
  const onDelete = async () => {
    try {
      if (!confirm("Are you sure you want to delete this funnel?")) return;
      setLoading(true);
      await axios.delete("/api/products/" + id);
      toast.success("Funnel deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 2. DUPLICATE ACTION
  const onDuplicate = async () => {
    try {
      setLoading(true);
      await axios.post("/api/products/" + id + "/duplicate");
      toast.success("Funnel duplicated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 3. COPY LINK ACTION
  const onCopy = () => {
    navigator.clipboard.writeText(window.location.origin + "/checkout/" + id);
    toast.success("Checkout link copied!");
  };

  return (
    <div className="group relative bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition shadow-lg">
      <div className="flex justify-between items-start mb-4">
        {/* ICON */}
        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold border border-indigo-500/20">
          {name.charAt(0).toUpperCase()}
        </div>
        
        {/* THE 3-DOT MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-800">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#161B22] border-slate-700 text-slate-200">
            
            {/* EDIT: Goes to the new form with Price/File inputs */}
            <Link href={"/dashboard/funnels/" + id}>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
            </Link>

            {/* DUPLICATE */}
            <DropdownMenuItem onClick={onDuplicate} className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>

            {/* COPY LINK */}
            <DropdownMenuItem onClick={onCopy} className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-700" />

            {/* DELETE */}
            <DropdownMenuItem 
              onClick={onDelete}
              disabled={loading}
              className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:text-red-500 focus:bg-red-500/10"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash className="h-4 w-4 mr-2" />
              )}
              Delete Funnel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* CARD CONTENT */}
      <div className="space-y-2">
        <h3 className="font-semibold text-white truncate text-lg">{name}</h3>
        <div className="flex items-center gap-3">
          <span className={	ext-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider }>
            {isPublished ? "Live" : "Draft"}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {price === 0 ? "FREE" : "KES " + price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-slate-800/50 flex items-center justify-between">
        <Link 
          href={"/checkout/" + id}
          target="_blank"
          className="text-xs font-medium text-slate-500 hover:text-indigo-400 flex items-center gap-1.5 transition"
        >
          <ExternalLink className="h-3 w-3" />
          Preview Page
        </Link>
      </div>
    </div>
  );
};