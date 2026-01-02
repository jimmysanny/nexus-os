"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Trash, ImageIcon, Eye, Zap, ShieldCheck, FileText, ExternalLink, UploadCloud } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/lib/uploadthing";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  isPublished: z.boolean().default(false),
  fileUrl: z.string().optional(),
});

interface ProductFormProps { initialData: Product; }

export const ProductForm = ({ initialData }: ProductFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData.fileUrl || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: initialData.name,
      description: initialData.description || "",
      price: initialData.price ? parseFloat(String(initialData.price)) : 0,
      isPublished: initialData.isPublished,
      fileUrl: initialData.fileUrl || "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'fileUrl') setPreviewUrl(value.fileUrl as string);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch("/api/products/" + initialData.id, values);
      toast.success("Product updated successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete("/api/products/" + initialData.id);
      toast.success("Product deleted");
      router.refresh();
      router.push("/dashboard/funnels");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const isImage = (url: string) => url?.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            Edit Funnel
            {form.watch("isPublished") ? <Badge className="bg-green-600">Live</Badge> : <Badge variant="secondary" className="bg-yellow-500 text-black">Draft</Badge>}
          </h1>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={() => window.open("/preview/" + initialData.id, "_blank")} variant="outline" size="sm" className="bg-slate-900 text-slate-300">View Public Page</Button>
           <Button onClick={onDelete} disabled={isLoading} variant="destructive" size="sm"><Trash className="h-4 w-4 mr-2" /> Delete</Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                   <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-300">Product Name</FormLabel><FormControl><Input disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white" /></FormControl><FormMessage /></FormItem>
                   )} />
                   <div className="h-4"></div>
                   <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-300">Description</FormLabel><FormControl><Textarea disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white" /></FormControl><FormMessage /></FormItem>
                   )} />
               </div>
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                 <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem><FormLabel className="text-slate-300">Price (KES)</FormLabel><FormControl><Input type="number" disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white" /></FormControl><FormMessage /></FormItem>
                 )} />
               </div>
             </div>
             <div className="space-y-6">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                 <FormField control={form.control} name="fileUrl" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {previewUrl ? (
                            <div className="relative aspect-video w-full flex items-center justify-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                {isImage(previewUrl) ? <Image src={previewUrl} alt="Preview" fill className="object-cover" /> : <FileText className="h-10 w-10 text-slate-400" />}
                                <Button type="button" variant="destructive" className="absolute top-2 right-2" onClick={() => { field.onChange(""); setPreviewUrl(""); }}><Trash className="h-4 w-4" /></Button>
                            </div>
                          ) : (
                            <UploadDropzone endpoint="productFile" onClientUploadComplete={(res) => { field.onChange(res?.[0].url); setPreviewUrl(res?.[0].url); toast.success("Uploaded"); }} onUploadError={() => toast.error("Failed")} className="ut-label:text-indigo-400 ut-button:bg-indigo-600 border-slate-700 bg-slate-900/50" />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                  <FormField control={form.control} name="isPublished" render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between"><FormLabel className="text-white">Publish Status</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                    )}
                  />
               </div>
               <Button disabled={isLoading} type="submit" className="w-full bg-indigo-600 text-white h-12">Save Changes</Button>
             </div>
          </div>
        </form>
      </Form>
    </div>
  );
};