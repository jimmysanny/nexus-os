"use client";
import { updateMerchantProfile } from "@/app/actions/actions";
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";

export default function SettingsForm({ merchant }: { merchant: any }) {
  const [logo, setLogo] = useState(merchant?.logoUrl || "");
  const [banner, setBanner] = useState(merchant?.bannerUrl || "");

  return (
    <form action={updateMerchantProfile} className="space-y-8">
       {/* Hidden inputs to send URLs to the server */}
       <input type="hidden" name="logoUrl" value={logo} />
       <input type="hidden" name="bannerUrl" value={banner} />

       <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
         <div className="relative h-48 bg-slate-100 group">
            {banner ? (
               <img src={banner} className="w-full h-full object-cover" alt="Store Banner" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">Upload a Banner Image</div>
            )}
            
            {/* Banner Uploader Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white p-2 rounded-xl">
                 <ImageUpload endpoint="imageUploader" onComplete={(url) => setBanner(url)} />
               </div>
            </div>

            {/* Logo Area */}
            <div className="absolute -bottom-8 left-8">
               <div className="relative w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg group-logo">
                  {logo ? (
                     <img src={logo} className="w-full h-full rounded-xl object-cover" alt="Logo" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-2xl"></div>
                  )}
                  {/* Logo Uploader Overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-logo-hover:opacity-100 flex items-center justify-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                     <div className="scale-75 bg-white p-1 rounded-lg">
                        <ImageUpload endpoint="imageUploader" onComplete={(url) => setLogo(url)} />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="p-8 pt-12 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Store Name</label>
                  <input name="name" defaultValue={merchant?.name || ""} placeholder="e.g. Nexus Digital" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold outline-none focus:border-blue-500" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Username</label>
                  <div className="flex items-center">
                     <span className="bg-slate-100 border border-r-0 border-slate-200 p-3 rounded-l-xl text-slate-500 text-sm">nexus.os/store/</span>
                     <input name="username" defaultValue={merchant?.username || ""} placeholder="username" className="flex-1 p-3 rounded-r-xl border border-slate-200 bg-white font-medium outline-none focus:border-blue-500" />
                  </div>
               </div>
            </div>
            
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Bio</label>
               <textarea name="bio" defaultValue={merchant?.bio || ""} placeholder="Tell your customers what you sell..." className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium h-24 outline-none focus:border-blue-500"></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Twitter</label>
                  <input name="twitter" defaultValue={merchant?.twitter || ""} placeholder="@username" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium outline-none focus:border-blue-500" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Instagram</label>
                  <input name="instagram" defaultValue={merchant?.instagram || ""} placeholder="@username" className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium outline-none focus:border-blue-500" />
               </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
               <button type="submit" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-slate-200">
                 Save Profile
               </button>
            </div>
         </div>
       </div>
    </form>
  );
}