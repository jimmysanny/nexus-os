"use client";
import { Package, Plus, Search } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="p-8 text-white min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl font-bold mb-1">Products</h1>
            <p className="text-gray-400">Manage your digital assets and pricing.</p>
        </div>
        <button className="bg-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
          <Plus size={20} /> New Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* EMPTY STATE CARD */}
      <div className="bg-gray-900/50 border border-gray-800 border-dashed rounded-2xl p-16 text-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Package size={40} className="text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No products found</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
            You haven't created any products yet. Start by adding a digital course, ebook, or service to sell on your funnels.
        </p>
        <button className="text-blue-400 font-bold hover:text-blue-300 hover:underline transition">
          + Create your first product
        </button>
      </div>
    </div>
  );
}