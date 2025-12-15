"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Onboarding() {
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const claim = async () => {
    if(!subdomain) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        alert("🎉 Site Claimed: " + subdomain + ".nexus-os.com");
        router.push("/dashboard"); // Next step
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Name your business</h1>
        <p className="text-gray-400 mb-8 text-lg">Choose the link your customers will visit.</p>
        
        <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl flex items-center mb-8">
            <input 
                value={subdomain}
                onChange={e=>setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                className="bg-transparent flex-1 p-4 text-xl outline-none font-mono"
                placeholder="mybrand"
            />
            <span className="text-gray-500 pr-4 font-mono">.nexus-os.com</span>
        </div>

        <button onClick={claim} disabled={loading} className="w-full bg-white text-black hover:bg-gray-200 font-bold text-xl py-4 rounded-xl flex items-center justify-center gap-2 transition">
            {loading ? <Loader2 className="animate-spin"/> : <>Launch Site <ArrowRight/></>}
        </button>
      </div>
    </div>
  );
}