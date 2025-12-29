"use client";

import Link from "next/link";
import { MoreVertical, Edit, Trash, ExternalLink } from "lucide-react";
import { formatDistance } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FunnelCardProps {
  funnel: {
    id: string;
    name: string;
    description: string;
    updatedAt: Date;
    published: boolean;
  };
}

export const FunnelCard = ({ funnel }: FunnelCardProps) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl hover:shadow-md transition overflow-hidden flex flex-col justify-between">
      
      {/* CARD HEADER / MENU */}
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white rounded-full shadow-sm ring-1 ring-black/5">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={'/dashboard/editor/' + funnel.id} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" /> Edit Funnel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={'/preview/' + funnel.id} target="_blank" className="cursor-pointer">
                <ExternalLink className="mr-2 h-4 w-4" /> Preview
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* CARD BODY */}
      <Link href={'/dashboard/editor/' + funnel.id} className="block p-6 h-full">
        <div className="flex flex-col h-full">
          <div className="h-32 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition">
             <span className="text-4xl"></span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{funnel.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{funnel.description || "No description provided."}</p>
          
          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-400">
            <span>{formatDistance(new Date(funnel.updatedAt), new Date(), { addSuffix: true })}</span>
            {funnel.published ? (
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Live</span>
            ) : (
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">Draft</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};