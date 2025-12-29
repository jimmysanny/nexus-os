"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const DeleteButton = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      if(!confirm("Are you sure? This will permanently delete this funnel.")) return;
      
      setIsLoading(true);
      await axios.delete("/api/products/" + productId);
      toast.success("Funnel deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={onDelete} disabled={isLoading} variant="destructive" size="sm" className="h-8 w-8 p-0">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash className="h-4 w-4" />
      )}
    </Button>
  );
};