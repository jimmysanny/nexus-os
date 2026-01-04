"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Trash, ImageIcon, Eye, Zap, ShieldCheck, FileText, ExternalLink, Cloud, AlertCircle, FileCheck } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

interface ProductFormProps {
  initialData: Product;
}

export const ProductForm = ({ initialData }: ProductFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // FIX: Force preview state to sync with initial data immediately
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

  // PREVIEW SYNC: Ensure the view updates whenever the form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'fileUrl') {
         setPreviewUrl(value.fileUrl as string);
      }
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
      setIsDeleting(true);
      await axios.delete("/api/products/" + initialData.id);
      toast.success("Product deleted");
      router.refresh();
      router.push("/dashboard/funnels");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper to check if file is an image for previewing
  const isImage = (url: string) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|png|webp|gif|svg)$/i);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Edit Funnel
            {form.watch("isPublished") ? (
              <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700 border-0">Live</Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-500 text-black hover:bg-yellow-600 border-0">Draft</Badge>
            )}
          </h1>
          <p className="text-slate-400 mt-2">Manage your product details, pricing, and digital assets.</p>
        </div>
        <div className="flex items-center gap-2">
           {!form.watch("isPublished") && (
             <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs mr-2">
               <AlertCircle className="h-3 w-3" />
               <span className="hidden md:inline">Publish to view</span>
             </div>
           )}
           <Button
             onClick={() => window.open("/f/" + initialData.id, "_blank")}
             disabled={!form.watch("isPublished")}
             variant="outline"
             size="sm"
             className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50"
           >
             <ExternalLink className="h-4 w-4 mr-2" /> View Public Page
           </Button>
           <Button onClick={onDelete} disabled={isLoading || isDeleting} variant="destructive" size="sm" className="bg-red-900/80 text-red-100 hover:bg-red-900 border border-red-800">
            <Trash className="h-4 w-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* LEFT COLUMN: DETAILS & UPLOAD */}
             <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/50">
                   <Zap className="h-5 w-5 text-indigo-500" />
                   <h2 className="text-lg font-semibold text-white">Product Details</h2>
                 </div>
                 <div className="space-y-6">
                   <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-300">Product Name</FormLabel><FormControl><Input disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white h-12 focus:border-indigo-500 placeholder:text-slate-600" /></FormControl><FormMessage /></FormItem>
                   )} />
                   <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem><FormLabel className="text-slate-300">Description</FormLabel><FormControl><Textarea disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white min-h-[120px] focus:border-indigo-500 placeholder:text-slate-600" /></FormControl><FormMessage /></FormItem>
                   )} />
                 </div>
               </div>
               
               {/* FIX: UPLOAD PREVIEW SECTION */}
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2"><ImageIcon className="h-5 w-5 text-indigo-400" /><h2 className="text-lg font-semibold text-white">Digital Asset</h2></div>
                 </div>
                 
                 <FormField control={form.control} name="fileUrl" render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {previewUrl ? (
                            /* FILE PREVIEW CARD - Shows when file exists */
                            <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl transition-all duration-300">
                              <div className="relative w-full p-8 flex flex-col items-center justify-center bg-slate-900 min-h-[250px]">
                                {isImage(previewUrl) ? (
                                  <div className="relative w-full h-64">
                                     <Image src={previewUrl} alt="Upload Preview" fill className="object-contain" />
                                  </div>
                                ) : (
                                  <div className="text-center flex flex-col items-center animate-in zoom-in duration-300">
                                     <div className="h-20 w-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
                                       <FileCheck className="h-10 w-10 text-indigo-400" />
                                     </div>
                                     <h3 className="text-lg font-medium text-white mb-1">File Uploaded Successfully</h3>
                                     <p className="text-sm font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-md border border-slate-800 max-w-[250px] truncate">
                                       {previewUrl.split('/').pop()}
                                     </p>
                                     <Badge variant="outline" className="mt-4 border-green-500/30 text-green-400 bg-green-500/5">Ready to Sell</Badge>
                                  </div>
                                )}
                              </div>
                              
                              {/* HOVER OVERLAY TO REMOVE/VIEW */}
                              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                <Button type="button" variant="secondary" onClick={() => window.open(previewUrl, "_blank")}><Eye className="h-4 w-4 mr-2" /> View File</Button>
                                <Button type="button" variant="destructive" onClick={() => { field.onChange(""); setPreviewUrl(""); }}><Trash className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          ) : (
                            /* EMPTY STATE - UPLOAD BUTTON */
                            <div className="border border-dashed border-slate-700 rounded-xl bg-slate-900/30 hover:bg-slate-900/50 transition-colors p-6">
                                <UploadDropzone 
                                  endpoint="productFile" 
                                  content={{ label: "Upload Course PDF, Video, or Ebook" }}
                                  onClientUploadComplete={(res) => { 
                                    const url = res?.[0].url;
                                    field.onChange(url); 
                                    setPreviewUrl(url); 
                                    toast.success("File uploaded! Click Save to finish."); 
                                  }} 
                                  onUploadError={() => { 
                                    toast.error("Upload failed. Try a smaller file."); 
                                  }} 
                                  className="ut-label:text-indigo-400 ut-button:bg-indigo-600 border-0" 
                                />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
             </div>

             {/* RIGHT COLUMN: PRICING & PUBLISH */}
             <div className="space-y-6">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/50">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-white">Pricing</h2>
                 </div>
                 <FormField control={form.control} name="price" render={({ field }) => (
                      <FormItem><FormLabel className="text-slate-300">Price (KES)</FormLabel><FormControl><div className="relative"><span className="absolute left-3 top-3 text-slate-500">KES</span><Input type="number" disabled={isLoading} {...field} className="bg-slate-900 border-slate-700 text-white pl-12 h-12 font-mono text-lg focus:border-indigo-500 placeholder:text-slate-600" /></div></FormControl><FormMessage /></FormItem>
                 )} />
               </div>

               {/* FIX: HIGH CONTRAST PUBLISH BOX */}
               <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-bl-full pointer-events-none" />
                  <FormField control={form.control} name="isPublished" render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg p-1">
                        <div className="space-y-1">
                          <FormLabel className="text-lg font-bold text-white tracking-tight">Publish Status</FormLabel>
                          <p className="text-sm text-slate-400 font-medium">Make this product visible to customers.</p>
                        </div>
                        <FormControl>
                           <Switch 
                             checked={field.value} 
                             onCheckedChange={field.onChange} 
                             className="data-[state=checked]:bg-green-500 scale-125 mr-2" 
                           />
                        </FormControl>
                      </FormItem>
                    )}
                  />
               </div>
               
               {!form.watch("isPublished") && (
                 <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
                   <AlertCircle className="h-4 w-4" />
                   <span>Your product is hidden. Turn on "Publish Status" to sell.</span>
                 </div>
               )}

               <Button disabled={isLoading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-xl font-bold shadow-xl shadow-indigo-500/20 rounded-xl mt-4">Save Changes</Button>
             </div>
          </div>
        </form>
      </Form>
    </div>
  );
};