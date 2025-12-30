import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/dashboard/product-form";

export default async function FunnelIdPage({ 
  params 
}: { 
  params: Promise<{ funnelId: string }> 
}) {
  const { userId } = await auth();
  const { funnelId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const product = await db.product.findUnique({
    where: {
      id: funnelId,
      userId
    }
  });

  if (!product) {
    redirect("/dashboard/funnels");
  }

  return (
    <div className="bg-black min-h-screen text-slate-200">
      <ProductForm initialData={product} />
    </div>
  );
}