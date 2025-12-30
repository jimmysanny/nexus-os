"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value) {
    return (
      <div className="relative flex items-center p-4 mt-2 rounded-md bg-slate-900/50 border border-slate-800">
        <div className="flex-1 text-sm text-slate-200 truncate hover:underline">
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        </div>
        <button
          onClick={() => onChange("")}
          className="ml-auto bg-rose-500 text-white p-1 rounded-full shadow-sm hover:bg-rose-600"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
        toast.success("File uploaded successfully");
      }}
      onUploadError={(error: Error) => {
        toast.error("Upload failed: " + error.message);
      }}
      className="bg-slate-900 border-slate-800 ut-label:text-indigo-400 ut-allowed-content:text-slate-500"
    />
  );
};