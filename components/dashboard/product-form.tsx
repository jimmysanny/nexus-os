"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash, UploadCloud, FileText, ImageIcon, X, Code, FileCode, Eye, Zap, ShieldCheck } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";

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
import { UploadDropzone } from "@/lib/uploadthing";
import { Badge } from "@/components/ui/badge"; // Using badge for status

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

  const getFileIcon = (url: string) => {
    if (url.endsWith(".pdf")) return <FileText className="h-12 w-12 text-rose-500 mx-auto mb-3" />;
    if (url.endsWith(".html") || url.endsWith(".htm")) return <Code className="h-12 w-12 text-orange-500 mx-auto mb-3" />;
    if (url.endsWith(".zip")) return <FileCode className="h-12 w-12 text-yellow-500 mx-auto mb-3" />;
    return <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />;
  };

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|png|webp|gif)$/i);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            Edit Funnel
            {form.watch("isPublished") ? (
              <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20">Live</Badge>
            ) : (
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Draft</Badge>
            )}
          </h1>
          <p className="text-slate-400 mt-2">Manage your product details, pricing, and digital assets.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button
            onClick={onDelete}
            disabled={isLoading || isDeleting}
            variant="destructive"
            size="sm"
            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
          >
            <Trash className="h-4 w-4 mr-2" /> Delete Funnel
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* LEFT COLUMN (Details) - Spans 2 cols */}
             <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/50">
                   <Zap className="h-5 w-5 text-indigo-500" />
                   <h2 className="text-lg font-semibold text-white">Product Details</h2>
                 </div>
                 
                 <div className="space-y-6">
                   <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Product Name</FormLabel>
                          <FormControl>
                            <Input disabled={isLoading} placeholder="e.g. Ultimate Masterclass" {...field} className="bg-slate-950/50 border-slate-800 text-white h-12 focus:border-indigo-500 transition-colors" />
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
                            <Textarea disabled={isLoading} placeholder="Describe what your customers will get..." {...field} className="bg-slate-950/50 border-slate-800 text-white min-h-[120px] focus:border-indigo-500 transition-colors" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                 </div>
               </div>

               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800/50">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-semibold text-white">Pricing</h2>
                 </div>
                 
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Price (KES)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-500">KES</span>
                            <Input 
                              type="number" 
                              disabled={isLoading} 
                              placeholder="0" 
                              {...field} 
                              className="bg-slate-950/50 border-slate-800 text-white pl-12 h-12 font-mono text-lg focus:border-indigo-500 transition-colors" 
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-slate-500 mt-2">
                          Set the price to 0 to make this product free.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>
             </div>

             {/* RIGHT COLUMN (Media & Status) - Spans 1 col */}
             <div className="space-y-6">
               
               {/* MEDIA UPLOAD CARD */}
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                     <ImageIcon className="h-5 w-5 text-indigo-400" />
                     <h2 className="text-lg font-semibold text-white">Asset</h2>
                   </div>
                   {form.watch("fileUrl") && (
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10">Uploaded</Badge>
                   )}
                 </div>
                 
                 <FormField
                    control={form.control}
                    name="fileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {field.value ? (
                            <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-black shadow-2xl transition-all duration-300 hover:border-slate-500">
                              {/* VISUAL PREVIEW */}
                              <div className="relative aspect-video w-full flex items-center justify-center bg-slate-900/50">
                                {isImage(field.value) ? (
                                  <Image 
                                    src={field.value} 
                                    alt="Upload Preview" 
                                    fill 
                                    className="object-cover" 
                                  />
                                ) : (
                                  <div className="text-center p-6">
                                     {getFileIcon(field.value)}
                                     <p className="text-sm font-medium text-slate-300 truncate px-4 max-w-[200px]">{field.value.split('/').pop()}</p>
                                     <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Ready to Download</p>
                                  </div>
                                )}
                              </div>

                              {/* OVERLAY ACTIONS */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                <Button 
                                  type="button" 
                                  variant="secondary"
                                  className="bg-white hover:bg-slate-200 text-black font-semibold"
                                  onClick={() => window.open(field.value, "_blank")}
                                >
                                  <Eye className="h-4 w-4 mr-2" /> Preview
                                </Button>
                                <Button 
                                  type="button" 
                                  variant="destructive"
                                  onClick={() => field.onChange("")}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/5 rounded-xl transition-all duration-300">
                              <UploadDropzone
                                endpoint="productFile"
                                onClientUploadComplete={(res) => {
                                  field.onChange(res?.[0].url);
                                  toast.success("Asset uploaded successfully");
                                }}
                                onUploadError={(error: Error) => {
                                  toast.error("Upload failed. Try a smaller file.");
                                }}
                                className="ut-label:text-indigo-400 ut-button:bg-indigo-600 ut-button:ut-readying:bg-indigo-600/50 py-8"
                              />
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>

               {/* PUBLISH STATUS CARD */}
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 shadow-sm">
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg p-1">
                        <div className="space-y-1">
                          <FormLabel className="text-base font-semibold text-white">Publish Status</FormLabel>
                          <FormDescription className="text-slate-500 text-xs">
                            {field.value ? "Your funnel is currently live." : "Your funnel is hidden."}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
               </div>

               <Button disabled={isLoading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 text-lg font-medium shadow-lg shadow-indigo-500/20">
                 {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                 Save Changes
               </Button>
             </div>
          </div>
        </form>
      </Form>
    </div>
  );
};