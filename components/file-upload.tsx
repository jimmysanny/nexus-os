"use client";
import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  if (value) {
    return (
      <div className="relative flex items-center p-4 mt-2 rounded-md bg-slate-900/50 border border-slate-800">
        <div className="flex-1 text-sm text-slate-200 truncate underline">
          {value}
        </div>
        <button
          onClick={() => onChange("")}
          className="ml-auto text-sm text-red-500 hover:text-red-400 font-medium"
          type="button"
        >
          Remove
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