"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewFunnelRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Generate a random ID (or you could use a library like uuid)
    const randomId = Math.random().toString(36).substring(7);
    
    // Redirect to the Editor with that new ID
    router.push(`/dashboard/funnels/${randomId}`);
  }, [router]);

  return (
    <div className="h-screen bg-black flex items-center justify-center text-white">
      <Loader2 className="animate-spin mr-2" /> Creating your funnel...
    </div>
  );
}