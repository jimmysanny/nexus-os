"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Plus, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price cannot be negative"),
});

export default function CreateFunnelPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/products", values);
      toast.success("Funnel created! Taking you to upload...");
      router.push("/dashboard/funnels/" + response.data.id);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-slate-200">
      <Link href="/dashboard/funnels" className="flex items-center text-slate-400 mb-6 hover:text-white transition">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Cancel & Go Back
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Funnel</h1>
        <p className="text-slate-400">
          Step 1: Name and price your product. You will add the file in the next step.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-[#0B0F1A] border border-slate-800 p-8 rounded-2xl shadow-xl">
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Funnel Name</FormLabel>
                <FormControl>
                  <Input 
                    disabled={isLoading} 
                    placeholder="e.g. My Masterclass" 
                    {...field} 
                    className="bg-slate-950 border-slate-800 text-white h-12" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    disabled={isLoading} 
                    placeholder="What are you selling?" 
                    {...field} 
                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FIXED PRICE FIELD: Explicitly casting the value to number to satisfy TypeScript */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-500" /> 
                  Price (KES)
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    disabled={isLoading} 
                    placeholder="0" 
                    {...field}
                    // FIX: We strictly ensure value is treated as a number
                    value={field.value as number}
                    onChange={field.onChange}
                    className="bg-slate-950 border-slate-800 text-white h-12 font-mono" 
                  />
                </FormControl>
                <FormDescription className="text-slate-500">
                  Set to 0 for a free product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-medium">
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Plus className="mr-2 h-5 w-5" />}
            Continue to Upload File
          </Button>
        </form>
      </Form>
    </div>
  );
}