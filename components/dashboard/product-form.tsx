"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft, DollarSign, FileText } from "lucide-react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// VALIDATION SCHEMA
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, { message: "Price cannot be negative" }),
  fileUrl: z.string().min(1, { message: "File Link is required (Google Drive, Dropbox, etc.)" }),
  isPublished: z.boolean().default(false),
});

interface ProductFormProps {
  initialData: {
    id: string;
    name: string;
    description: string | null;
    price: number | null;
    fileUrl: string | null;
    isPublished: boolean;
  };
}

export const ProductForm = ({ initialData }: ProductFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      price: initialData.price || 0,
      fileUrl: initialData.fileUrl || "",
      isPublished: initialData.isPublished || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch("/api/products/" + initialData.id, values);
      toast.success("Funnel updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/funnels">
            <Button variant="ghost" size="sm" className="text-slate-400">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Funnel</h1>
        </div>
        {initialData.isPublished && (
          <div className="text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            Live on Market
          </div>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* GENERAL SECTION */}
          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-medium text-white mb-4">General Information</h2>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Funnel Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="e.g., Ultimate Marketing Guide" {...field} className="bg-slate-950 border-slate-800 text-white" />
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
                  <FormLabel className="text-slate-300">Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} placeholder="Describe your product..." {...field} className="bg-slate-950 border-slate-800 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* PRICING & FILE SECTION */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* PRICE */}
            <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
               <div className="flex items-center gap-2 mb-4">
                 <DollarSign className="h-5 w-5 text-green-500" />
                 <h2 className="text-lg font-medium text-white">Pricing</h2>
               </div>
               <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Price (KES)</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={isLoading} placeholder="1000" {...field} className="bg-slate-950 border-slate-800 text-white" />
                    </FormControl>
                    <FormDescription>Set to 0 for free products.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* FILE LINK */}
            <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
               <div className="flex items-center gap-2 mb-4">
                 <FileText className="h-5 w-5 text-indigo-500" />
                 <h2 className="text-lg font-medium text-white">Product File</h2>
               </div>
               <FormField
                control={form.control}
                name="fileUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">PDF / File Link</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Paste Google Drive / Dropbox link here" {...field} className="bg-slate-950 border-slate-800 text-white" />
                    </FormControl>
                    <FormDescription>The direct link sent to customers after payment.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* PUBLISH SWITCH */}
          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-lg font-medium text-white">Publish Funnel</h2>
              <p className="text-sm text-slate-400">Make this product visible on the marketplace.</p>
            </div>
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-end">
            <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};