"use client";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUpload({ onComplete }: { onComplete: (url: string) => void }) {
  return (
    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50 text-center">
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]) onComplete(res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Supports PNG, JPG (Max 4MB)</p>
    </div>
  );
}