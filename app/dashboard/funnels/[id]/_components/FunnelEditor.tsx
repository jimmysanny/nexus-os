"use client";

import { useState } from "react";
import { Save, Monitor, Smartphone, Layout, Type, Image as ImageIcon, Code, Palette, Loader2, CheckCircle, CreditCard, X } from "lucide-react";
import { saveFunnel } from "@/app/actions/saveFunnel";
import { usePaystackPayment } from "react-paystack";
import { UploadButton } from "@/lib/uploadthing";

// Mock ID for now
const MOCK_FUNNEL_ID = "test-funnel-id"; 

export default function FunnelEditor() {
  // --- CONTENT STATE ---
  const [headline, setHeadline] = useState("Unlock Your Potential Today");
  const [description, setDescription] = useState("Join thousands of happy customers who have transformed their lives.");
  const [price, setPrice] = useState("49.99");
  
  // --- DESIGN STATE ---
  const [themeColor, setThemeColor] = useState("blue");
  const [font, setFont] = useState("sans");
  const [logoUrl, setLogoUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3");
  const [customHtml, setCustomHtml] = useState("");

  const [activeTab, setActiveTab] = useState("content");
  const [status, setStatus] = useState("idle");

  // PAYSTACK CONFIG
  const config = {
      reference: (new Date()).getTime().toString(),
      email: "customer@example.com",
      amount: Math.floor(parseFloat(price) * 100),
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "", 
      currency: "KES",
  };

  const initializePayment = usePaystackPayment(config);

  const getThemeClass = (color: string) => {
    switch(color) {
        case "purple": return "bg-purple-600 hover:bg-purple-700";
        case "green": return "bg-green-600 hover:bg-green-700";
        case "red": return "bg-red-600 hover:bg-red-700";
        default: return "bg-blue-600 hover:bg-blue-700";
    }
  };
  
  const getFontClass = (f: string) => {
    switch(f) {
        case "serif": return "font-serif";
        case "mono": return "font-mono";
        default: return "font-sans";
    }
  };

  const handleSave = async () => {
    setStatus("saving");
    const funnelData = { headline, description, price, themeColor, font, logoUrl, heroImageUrl, customHtml };
    await saveFunnel(MOCK_FUNNEL_ID, funnelData);
    setTimeout(() => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
    }, 500);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] text-white">
      {/* LEFT: SIDEBAR CONTROLS */}
      <div className="w-80 border-r border-gray-800 bg-gray-900 flex flex-col">
        <div className="flex border-b border-gray-800">
            <button onClick={() => setActiveTab("content")} className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 ${activeTab === "content" ? "text-blue-400 bg-gray-800" : "text-gray-400 hover:text-white"}`}>
                <Layout size={16} /> Content
            </button>
            <button onClick={() => setActiveTab("design")} className={`flex-1 py-4 font-bold text-sm flex items-center justify-center gap-2 ${activeTab === "design" ? "text-blue-400 bg-gray-800" : "text-gray-400 hover:text-white"}`}>
                <Palette size={16} /> Design
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {activeTab === "content" && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Text Content</label>
                        <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none mb-3" placeholder="Headline" />
                        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 text-sm focus:border-blue-500 outline-none" placeholder="Description" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pricing</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-2 pl-8 text-sm focus:border-blue-500 outline-none" />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "design" && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Theme Color</label>
                        <div className="flex gap-3">
                            {["blue", "purple", "green", "red"].map((c) => (
                                <button key={c} onClick={() => setThemeColor(c)} className={`w-8 h-8 rounded-full border-2 ${themeColor === c ? "border-white" : "border-transparent"}`} style={{ backgroundColor: c === 'blue' ? '#2563eb' : c === 'purple' ? '#9333ea' : c === 'green' ? '#16a34a' : '#dc2626' }} />
                            ))}
                        </div>
                    </div>
                    
                    {/* UPLOAD HERO IMAGE */}
                    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                           <ImageIcon size={14}/> Hero Image
                        </label>
                        
                        {heroImageUrl ? (
                            <div className="relative mb-3 group">
                                <img src={heroImageUrl} alt="Hero" className="w-full h-32 object-cover rounded-lg border border-gray-600" />
                                <button 
                                    onClick={() => setHeroImageUrl("")} 
                                    className="absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : null}

                        <UploadButton
                            endpoint="imageUploader"
                            appearance={{
                                button: "bg-blue-600 text-sm font-bold w-full",
                                allowedContent: "hidden"
                            }}
                            onClientUploadComplete={(res) => {
                                if (res?.[0]) {
                                    setHeroImageUrl(res[0].url);
                                    alert("Image Uploaded!");
                                }
                            }}
                            onUploadError={(error: Error) => {
                                alert(`ERROR! ${error.message}`);
                            }}
                        />
                        <p className="text-[10px] text-gray-500 mt-2 text-center">Max 4MB</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2"><Type size={14}/> Typography</label>
                        <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm focus:border-blue-500 outline-none">
                            <option value="sans">Modern Sans</option>
                            <option value="serif">Classic Serif</option>
                            <option value="mono">Tech Mono</option>
                        </select>
                    </div>
                </div>
            )}
        </div>

        {/* SAVE BUTTON */}
        <div className="p-4 border-t border-gray-800">
            <button 
                onClick={handleSave}
                disabled={status === "saving"}
                className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 ${status === 'success' ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
            >
                {status === "saving" ? <><Loader2 className="animate-spin" size={18} /> Saving...</> : status === "success" ? <><CheckCircle size={18} /> Saved!</> : <><Save size={18} /> Publish Changes</>}
            </button>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW AREA */}
      <div className="flex-1 bg-black p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 flex bg-gray-900 rounded-lg p-1 border border-gray-800 z-10">
            <button className="p-2 text-white bg-gray-800 rounded"><Monitor size={18} /></button>
            <button className="p-2 text-gray-500 hover:text-white"><Smartphone size={18} /></button>
        </div>
        <div className={`w-full max-w-md bg-white text-black rounded-3xl overflow-hidden shadow-2xl min-h-[600px] flex flex-col relative ${getFontClass(font)}`}>
            <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
                {logoUrl ? <img src={logoUrl} alt="Logo" className="h-8 object-contain" /> : <span className="font-bold text-white/80">BrandName</span>}
            </div>
            <div className="h-64 relative flex items-end p-6">
                <img src={heroImageUrl} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
                <div className={`absolute inset-0 opacity-80 ${themeColor === 'blue' ? 'bg-blue-900/60' : themeColor === 'purple' ? 'bg-purple-900/60' : themeColor === 'green' ? 'bg-green-900/60' : 'bg-red-900/60'}`}></div>
                <h1 className="text-3xl font-extrabold text-white relative z-10 leading-tight">{headline}</h1>
            </div>
            <div className="p-6 space-y-6 bg-white flex-1">
                <p className="text-gray-600 leading-relaxed">{description}</p>
                {customHtml && <div dangerouslySetInnerHTML={{ __html: customHtml }} className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm" />}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-gray-500 font-medium">Total</span>
                    <span className={`text-3xl font-bold ${themeColor === 'blue' ? 'text-blue-600' : themeColor === 'purple' ? 'text-purple-600' : themeColor === 'green' ? 'text-green-600' : 'text-red-600'}`}>${price}</span>
                </div>
                
                {/* REAL PAYMENT BUTTON */}
                <button 
                  onClick={() => initializePayment({ onSuccess: () => alert('Paid!'), onClose: () => {} })}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2 ${getThemeClass(themeColor)}`}
                >
                    Buy Now <CreditCard size={20} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
