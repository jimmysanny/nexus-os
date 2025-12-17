"use client";
import Link from "next/link";
import { Plus, Globe, MoreVertical, Loader2 } from "lucide-react";
import { useState } from "react";
import { saveFunnel } from "@/app/actions/funnel";

export default function FunnelsList() {
  const [loading, setLoading] = useState(false);

  // This will create a real funnel in your database
  const handleCreate = async () => {
    setLoading(true);
    const newId = crypto.randomUUID(); // Generates a unique ID
    
    try {
        // Save empty funnel to database
        await saveFunnel(newId, [], "My New Funnel");
        
        // Redirect to the editor
        window.location.href = `/dashboard/funnels/${newId}`;
    } catch (e) {
        alert("Error creating funnel. Make sure you are logged in.");
        setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Funnels</h1>
          <p className="text-gray-400">Manage your landing pages and sales flows.</p>
        </div>
        <button 
            onClick={handleCreate} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2"
        >
            {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} 
            Create Funnel
        </button>
      </div>

      {/* Empty State / List */}
      <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-xl border-dashed">
        <h3 className="text-xl font-bold text-gray-500 mb-2">No funnels found</h3>
        <p className="text-gray-600 mb-6">Click the button above to start building.</p>
      </div>
    </div>
  );
}