import { notFound } from "next/navigation";
import { getPublicFunnel } from "@/app/actions/funnel";
import PaystackWrapper from "@/app/components/PaystackWrapper";
import Link from "next/link";

export default async function PublicFunnelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const funnel = await getPublicFunnel(id);

  if (!funnel) return notFound();

  // Parse the blocks safely
  let blocks = [];
  try {
    blocks = typeof funnel.blocks === 'string' ? JSON.parse(funnel.blocks) : funnel.blocks;
  } catch (e) {
    blocks = [];
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER (Optional Branding) */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
         <span className="font-bold tracking-tight text-xl">Nexus Verified</span>
         <Link href="/" className="text-xs text-gray-500 hover:text-black">Powered by Nexus OS</Link>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-4xl mx-auto py-12 px-6">
        {blocks.length === 0 ? (
           <div className="text-center py-20">
             <h1 className="text-2xl font-bold text-gray-400">This page is empty.</h1>
           </div>
        ) : (
           <div className="space-y-12">
             {blocks.map((block: any) => (
               <div key={block.id} className="transition-all duration-500">
                 
                 {/* HERO BLOCK */}
                 {block.type === 'hero' && (
                   <div className="text-center space-y-4">
                     <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900">
                       {block.content}
                     </h1>
                     <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                       Secure your spot today directly through Nexus Frontier.
                     </p>
                   </div>
                 )}

                 {/* CHECKOUT BLOCK */}
                 {block.type === 'checkout' && (
                    <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-xl">
                       <div className="text-center mb-6">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                            Verified Offer
                          </span>
                          <h2 className="text-3xl font-bold mt-4">KES {block.content}</h2>
                          <p className="text-gray-500 text-sm mt-2">Secure Payment via M-Pesa / Card</p>
                       </div>
                       <PaystackWrapper email="customer@client.com" amount={parseInt(block.content)} />
                       <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                           256-bit SSL Secured
                       </p>
                    </div>
                 )}

               </div>
             ))}
           </div>
        )}
      </main>
    </div>
  );
}
