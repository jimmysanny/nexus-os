"use client";

import { MoreVertical, Edit, Trash, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const onDelete = async () => {
    try {
      if (!confirm("Are you sure? This funnel will be gone forever.")) return;
      
      await axios.delete("/api/products/" + id);
      toast.success("Funnel deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition">
      <div className="flex justify-between items-start mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        
        {/* THE THREE DOTS MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-200">
            <Link href={"/dashboard/funnels/" + id}>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
                <Edit className="h-4 w-4 mr-2" />
                Edit Funnel
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem 
              onClick={onDelete}
              className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:text-red-500"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <h3 className="font-semibold text-white mb-1">{name}</h3>
        <div className="flex items-center gap-2">
          <span className={	ext-[10px] px-2 py-0.5 rounded-full font-medium }>
            {isPublished ? "Published" : "Draft"}
          </span>
          <span className="text-xs text-slate-500">
            {price === 0 ? "Free" : "KES " + price}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
        <Link 
          href={"/checkout/" + id}
          className="text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition"
        >
          <ExternalLink className="h-3 w-3" />
          View Page
        </Link>
        <span className="text-slate-600">12/29/2025</span>
      </div>
    </div>
  );
};