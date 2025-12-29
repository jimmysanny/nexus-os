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
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0),
  fileUrl: z.string().min(1, "File Link is required"),
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
      await axios.patch("/api/pr       <FormControl><Input {...field} className="bg-slate-950 border-slate-800 text-white" /></FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Description</FormLabel>
                <FormControl><Textarea {...field} className="bg-slate-950 border-slate-800 text-white" /></FormControl>
              </FormItem>
            )} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
               <div className="flex items-center gap-2 mb-4"><DollarSign className="h-5 w-5 text-green-500" /><h2 className="text-white font-medium">Pricing (KES)</h2></div>
               <FormField control={form.control} name="price" render={({ field }) => (
                 <FormItem>
                   <FormControl><Input type="number" {...field} className="bg-slate-950 border-slate-800 text-white" /></FormControl>
                   <FormDescription>Set to 0 for Free.</FormDescription>
                 </FormItem>
               )} />
            </div>

            <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6">
               <div className="flex items-center gap-2 mb-4"><FileText className="h-5 w-5 text-indigo-500" /><h2 className="text-white font-medium">Product File Link</h2></div>
               <FormField control={form.control} name="fileUrl" render={({ field }) => (
                 <FormItem>
                   <FormControl><Input placeholder="https://drive.google.com/..." {...field} className="bg-slate-950 border-slate-800 text-white" /></FormControl>
                   <FormDescription>Link to your PDF/File.</FormDescription>
                 </FormItem>
               )} />
            </div>
          </div>

          <div className="bg-[#0B0F1A] border border-slate-800 rounded-xl p-6 flex justify-between items-center">
            <div className="space-y-0.5"><h2 className="text-white font-medium">Publish to Market</h2><p className="text-xs text-slate-400">Make it visible to customers.</p></div>
            <FormField control={form.control} name="isPublished" render={({ field }) => (
              <FormItem><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
            )} />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};