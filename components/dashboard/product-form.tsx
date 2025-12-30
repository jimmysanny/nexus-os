"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Save, Trash, ArrowLeft, DollarSign } from "lucide-react";
import Link from "next/link";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileUpload } from "@/components/file-upload";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  fileUrl: z.string().min(1, "Product file is required"),
  isPublished: z.boolean().default(false),
});

export const ProductForm = ({ initialData }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      description: initialData.description || "",
      price: initialData.price || 0,
      fileUrl: initialData.fileUrl || "",
      isPublished: initialData.isPublished || false,
    },
  });

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await axios.patch("/api/products/" + initialData.id, values);
      toast.success("Funnel updated");
      router.refresh();
      router.push("/dashboard/funnels");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/products/" + initialData.id);
      toast.success("Funnel deleted");
      router.refresh();
      router.push("/dashboard/funnels");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/funnels">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Funnel</h1>
        </div>
        <Button onClick={onDelete} disabled={isLoading} variant="destructive" size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* LEFT COL: DETAILS */}
            <div className="space-y-6">
              <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funnel Name</FormLabel>
                    <FormControl><Input disabled={isLoading} {...field} className="bg-slate-950 border-slate-800" /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea disabled={isLoading} {...field} className="bg-slate-950 border-slate-800" /></FormControl>
                  </FormItem>
                )} />
              </div>

              <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                 <div className="flex items-center gap-2 mb-4">
                   <DollarSign className="h-5 w-5 text-green-500" />
                   <h2 className="font-medium">Pricing (KES)</h2>
                 </div>
                 <FormField control={form.control} name="price" render={({ field }) => (
                   <FormItem>
                     <FormControl><Input type="number" disabled={isLoading} {...field} className="bg-slate-950 border-slate-800" /></FormControl>
                     <FormDescription>Set to 0 for Free products</FormDescription>
                   </FormItem>
                 )} />
              </div>
            </div>

            {/* RIGHT COL: UPLOAD & PUBLISH */}
            <div className="space-y-6">
              <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                 <h2 className="font-medium mb-4">Digital Asset (Uploadthing)</h2>
                 <FormField control={form.control} name="fileUrl" render={({ field }) => (
                   <FormItem>
                     <FormControl>
                       <FileUpload 
                          endpoint="productFile" 
                          value={field.value} 
                          onChange={field.onChange} 
                       />
                     </FormControl>
                     <FormMessage />
                   </FormItem>
                 )} />
              </div>

              <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 flex justify-between items-center">
                <div className="space-y-0.5">
                  <h2 className="font-medium">Publish Status</h2>
                  <p className="text-xs text-slate-400">Visible in Marketplace?</p>
                </div>
                <FormField control={form.control} name="isPublished" render={({ field }) => (
                  <FormItem>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                  </FormItem>
                )} />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700">
            {isLoading ? <Loader2 className="animate-spin" /> : <Save className="mr-2 h-4 w-4" />} 
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};