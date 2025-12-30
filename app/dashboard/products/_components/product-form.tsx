"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, DollarSign, File, CheckCircle2 } from "lucide-react";

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
import { UploadDropzone } from "@/lib/uploadthing"; // USING UPLOADTHING NOW
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
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
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
      console.log("Saving Product:", values);
      // await axios.post('/api/products', values);
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center hover:bg-gray-50 transition">
                    {field.value ? (
                       <div className="flex flex-col items-center justify-center gap-2 text-green-600 font-medium py-8">
                          <CheckCircle2 className="w-10 h-10" /> 
                          <p>File Uploaded Successfully!</p>
                          <p className="text-xs text-gray-500 break-all px-4">{field.value}</p>
                       </div>
                    ) : (
                      <UploadDropzone
                        endpoint="productFile"
                        onClientUploadComplete={(res) => {
                          // Do something with the response
                          console.log("Files: ", res);
                          if (res && res[0]) {
                              field.onChange(res[0].url);
                              toast.success("Upload Completed");
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error("Upload failed: " + error.message);
                        }}
                        appearance={{
                            button: "bg-indigo-600 text-white hover:bg-indigo-700",
                            container: "border-none"
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload your PDF, Zip, or Video here.
                </FormDescription>
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

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700">
            {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Save Product
          </Button>
        </form>
      </Form>
    </div>
  );
};