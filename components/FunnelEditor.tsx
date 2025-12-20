"use client";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

export default function FunnelEditor({ funnel }: { funnel: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <form action={`/api/funnels/${funnel.id}`} method="POST" className="space-y-8">
      <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
        
        {/* Product Name */}
        <div>
          <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Product Name</label>
          <input name="name" defaultValue={funnel.name} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
        </div>
        
        {/* Price & Color Grid */}
        <div className="grid grid-cols-2 gap-6">
           <div>
             <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Price (KES)</label>
             <input name="price" type="number" defaultValue={funnel.price} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" />
           </div>
           <div>
             <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Brand Theme</label>
             <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input type="color" name="brandColor" defaultValue={funnel.brandColor || "#2563eb"} className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent" />
                <span className="text-sm font-bold text-slate-600">Select Color</span>
             </div>
           </div>
        </div>

        {/* High Contrast Upload Zone */}
        <div>
           <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Digital Asset File</label>
           
           {/* Hidden Input stores the URL */}
           <input type="hidden" name="digitalProductUrl" defaultValue={funnel.digitalProductUrl} id="asset-url" />
           
           <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-500 transition-all group">
              
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button: "bg-slate-900 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-blue-600 transition-all",
                  allowedContent: "hidden" 
                }}
                onClientUploadComplete={(res) => {
                  const url = res[0].url;
                  const name = res[0].name;
                  const input = document.getElementById("asset-url") as HTMLInputElement;
                  if (input) input.value = url;
                  setFileName(name);
                  alert(" FILE UPLOADED SUCCESSFULLY");
                }}
                onUploadError={(error: Error) => {
                  alert(`UPLOAD FAILED: ${error.message}`);
                }}
              />

              {/* Status Text - High Visibility */}
              <div className="mt-4 text-center">
                 {fileName ? (
                    <p className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200 inline-block">
                       Attached: {fileName}
                    </p>
                 ) : funnel.digitalProductUrl ? (
                    <p className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
                        File Currently Active
                    </p>
                 ) : (
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600">
                       Supports PDF, ZIP, PNG (Max 32MB)
                    </p>
                 )}
              </div>
           </div>
        </div>
      </div>
      
      <button type="submit" disabled={isSaving} className="w-full py-5 bg-slate-900 text-white rounded-xl font-black text-lg uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
        {isSaving ? "Saving..." : "Save Product Settings"}
      </button>
    </form>
  );
}