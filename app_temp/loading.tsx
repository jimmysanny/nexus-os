import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-black min-h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
    </div>
  );
}
