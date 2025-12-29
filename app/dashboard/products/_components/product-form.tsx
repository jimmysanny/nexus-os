"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, UploadCloud, DollarSign, File, Image as ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a number"),
  fileUrl: z.string().min(1, "Product file is required"),
  imageUrl: z.string().optional(),
});

export const ProductForm = () => {
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      fileUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // API call to save product would go here
      // await axios.post('/api/products', values);
      console.log("Saving:", values);
      toast.success("Product Ready! (Database save pending)");
      router.push("/dashboard/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Masterclass PDF" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (KES/USD)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input type="number" placeholder="1000" className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Set to 0 for free products.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="fileUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Digital File (Downloadable)</FormLabel>
                <FormControl>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition">
                    {field.value ? (
                       <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                          <File className="w-5 h-5" /> File Uploaded!
                       </div>
                    ) : (
                      <div className="space-y-2">
                        <UploadCloud className="w-8 h-8 mx-auto text-gray-400" />
                        <Input
                          type="file"
                          disabled={isUploading}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setIsUploading(true);
                              const res = await edgestore.publicFiles.upload({ file });
                              field.onChange(res.url);
                              setIsUploading(false);
                              toast.success("File uploaded!");
                            }
                          }}
                          className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <p className="text-xs text-gray-500">PDF, Zip, Video (Max 50MB)</p>
                      </div>
                    )}
                  </div>
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe what they will get..." className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isUploading || form.formState.isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Product
          </Button>
        </form>
      </Form>
    </div>
  );
};