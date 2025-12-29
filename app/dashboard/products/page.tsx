import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Edit, Plus, FileText } from "lucide-react";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./_components/delete-button";

export default async function ProductsPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const products = await db.product.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Funnels</h1>
           <p className="text-sm text-gray-500">Manage your digital products and prices.</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Funnel
          </Button>
        </Link>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    No funnels found. Click 'Create Funnel' to start.
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.price === 0 ? "Free" : "KES " + product.price}
                  </td>
                  <td className="px-6 py-4">
                    {product.isPublished ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Published
                        </span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Draft
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={"/dashboard/products/" + product.id}>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-gray-500" />
                        </Button>
                      </Link>
                      <DeleteButton productId={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}