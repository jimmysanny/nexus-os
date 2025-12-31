"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Trash, UploadCloud, FileText, ImageIcon, X } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image"; // Added for thumbnails

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

// Define Schema
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
      toast.success("Product updated");
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

  // HELPER: Check if file is image based on extension or assumptions
  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|png|webp|gif)$/i) || url.includes("utfs.io/f/"); 
    // We assume most uploads here are images for now unless they end in .pdf
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Funnel</h1>
          <p className="text-slate-400">Update your product details and settings.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={onDelete} disabled={isLoading || isDeleting} variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* LEFT COLUMN */}
             <div className="space-y-8">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Product Name</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} placeholder="e.g. Advanced Course" {...field} className="bg-slate-950 border-slate-800 text-white" />
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
                      <FormLabel className="text-white">Description</FormLabel>
                      <FormControl>
                        <Textarea disabled={isLoading} placeholder="This course covers..." {...field} className="bg-slate-950 border-slate-800 text-white min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Price (KES)</FormLabel>
                      <FormControl>
                        <Input type="number" disabled={isLoading} placeholder="0" {...field} className="bg-slate-950 border-slate-800 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>

             {/* RIGHT COLUMN */}
             <div className="space-y-8">
               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                 <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                   {/* Icon changes based on upload status */}
                   {form.watch("fileUrl") ? <ImageIcon className="h-5 w-5 text-green-500" /> : <UploadCloud className="h-5 w-5 text-indigo-400" />}
                   <span>Digital Asset</span>
                 </div>
                 
                 <FormField
                    control={form.control}
                    name="fileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          {field.value ? (
                            <div className="relative group">
                              {/* VISUAL PREVIEW LOGIC */}
                              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center">
                                {field.value.endsWith(".pdf") ? (
                                  <div className="text-center p-4">
                                     <FileText className="h-16 w-16 text-slate-500 mx-auto mb-2" />
                                     <p className="text-xs text-slate-400 break-all px-4">{field.value.split('/').pop()}</p>
                                  </div>
                                ) : (
                                  <Image 
                                    src={field.value} 
                                    alt="Upload Preview" 
                                    fill 
                                    className="object-cover" 
                                  />
                                )}
                              </div>

                              {/* REMOVE BUTTON */}
                              <div className="absolute top-2 right-2">
                                <Button 
                                  type="button" 
                                  variant="destructive" 
                                  size="icon" 
                                  className="h-8 w-8 opacity-90 hover:opacity-100"
                                  onClick={() => field.onChange("")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <UploadDropzone
                              endpoint="productFile"
                              onClientUploadComplete={(res) => {
                                field.onChange(res?.[0].url);
                                toast.success("File uploaded");
                              }}
                              onUploadError={(error: Error) => {
                                toast.error("Upload failed");
                              }}
                              className="ut-label:text-indigo-400 ut-button:bg-indigo-600 ut-button:ut-readying:bg-indigo-600/50"
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
               </div>

               <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-800 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base text-white">Publish Product</FormLabel>
                          <FormDescription className="text-slate-500">
                            Make this product visible in the marketplace.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
               </div>

               <Button disabled={isLoading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12">
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                 Save Changes
               </Button>
             </div>
          </div>
        </form>
      </Form>
    </div>
  );
};