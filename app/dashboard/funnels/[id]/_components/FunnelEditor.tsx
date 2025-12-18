"use client";

import { useState } from "react";
import { Save, Eye, Smartphone, Monitor } from "lucide-react";

export default function FunnelEditor() {
  // These are the "State" variables that let you type
  const [headline, setHeadline] = useState("Unlock Your Potential Today");
  const [description, setDescription] = useState("Join thousands of happy customers who have transformed their lives.");
  const [price, setPrice] = useState("49.99");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving
    setTimeout(() => {
        alert("Changes Saved! (This is a demo save)");
        setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      
      {/* LEFT: EDITOR PANEL */}
      <div className="w-80 border-r border-gray-800 bg-gray-900/50 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5" /> Editor Controls
        </h3>

        <div className="space-y-6">
            {/* Headline Input */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Headline</label>
                <input 
                    type="text" 
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
            </div>

            {/* Description Input */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Description</label>
                <textarea 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                />
            </div>

            {/* Price Input */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Price (USD)</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input 
                        type="number" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-black border border-gray-700 rounded-lg p-3 pl-8 text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
                    />
                </div>
            </div>

            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
                {isSaving ? "Saving..." : <><Save size={18} /> Save Changes</>}
            </button>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="flex-1 bg-black p-8 flex flex-col items-center justify-center relative">
        {/* Device Toggles */}
        <div className="absolute top-6 flex bg-gray-900 rounded-lg p-1 border border-gray-800">
            <button className="p-2 text-white bg-gray-800 rounded"><Monitor size={18} /></button>
            <button className="p-2 text-gray-500 hover:text-white"><Smartphone size={18} /></button>
        </div>

        {/* The Phone/Screen Preview */}
        <div className="w-full max-w-2xl bg-white text-black rounded-xl overflow-hidden shadow-2xl min-h-[500px] animate-in fade-in zoom-in duration-300">
            {/* Preview Header */}
            <div className="bg-blue-600 p-8 text-white text-center">
                <h1 className="text-3xl font-extrabold mb-2">{headline}</h1>
            </div>
            
            {/* Preview Body */}
            <div className="p-8 text-center space-y-8">
                <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
                
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 inline-block">
                    <span className="block text-gray-500 text-sm mb-1">Total Price</span>
                    <span className="text-4xl font-bold text-blue-600"></span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-xl shadow-lg transform transition hover:scale-[1.02]">
                    Buy Now
                </button>
            </div>
        </div>
        <p className="mt-4 text-gray-500 text-sm">Live Preview</p>
      </div>
    </div>
  );
}
