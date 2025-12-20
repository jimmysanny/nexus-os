"use client";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function ImageUpload({ onComplete, endpoint }: { onComplete: (url: string) => void, endpoint: "imageUploader" }) {
  return (
    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] bg-slate-50 text-center">
      <UploadButton<OurFileRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res?.[0]) onComplete(res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}