import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CreditCard, CheckCircle } from "lucide-react";
import { PaymentButton } from "./_components/PaymentButton";

// Helper to get theme colors
const getThemeColors = (color: string) => {
    switch(color) {
        case "purple": return "bg-purple-900/60";
        case "green": return "bg-green-900/60";
        case "red": return "bg-red-900/60";
        default: return "bg-blue-900/60";
    }
};

const getButtonColor = (color: string) => {
    switch(color) {
        case "purple": return "bg-purple-600 hover:bg-purple-700";
        case "green": return "bg-green-600 hover:bg-green-700";
        case "red": return "bg-red-600 hover:bg-red-700";
        default: return "bg-blue-600 hover:bg-blue-700";
    }
};

// FIXED: params is now a Promise in Next.js 15+
export default async function FunnelPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. AWAIT THE PARAMS (Crucial Fix)
  const { id } = await params;

  // 2. Try to find by SUBDOMAIN first (e.g., "test")
  let funnel = await db.funnel.findFirst({
    where: { subdomain: id, published: true }
  });

  // 3. If not found, try by ID (fallback)
  if (!funnel) {
    funnel = await db.funnel.findUnique({
      where: { id: id }
    });
  }

  // 4. Still nothing? 404.
  if (!funnel) return notFound();

  return (
    <div className={`min-h-screen font-${funnel.font || "sans"}`}>
       {/* HERO SECTION */}
       <div className="relative h-96 flex items-center justify-center text-center px-4">
          <img 
            src={funnel.heroImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className={`absolute inset-0 ${getThemeColors(funnel.theme || "blue")}`}></div>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            {funnel.logo && <img src={funnel.logo} alt="Logo" className="h-16 mx-auto mb-4 object-contain" />}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-xl">
                {funnel.headline}
            </h1>
          </div>
       </div>

       {/* CONTENT SECTION */}
       <div className="max-w-3xl mx-auto px-6 py-16 bg-white -mt-20 relative rounded-3xl shadow-2xl z-20">
          <div className="prose prose-lg mx-auto text-gray-600 mb-10">
            <p className="text-xl leading-relaxed">{funnel.description}</p>
          </div>

          {/* HTML BADGE (If any) */}
          {funnel.customHtml && (
             <div className="mb-8 flex justify-center" dangerouslySetInnerHTML={{ __html: funnel.customHtml }} />
          )}

          {/* CHECKOUT CARD */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
             <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Price</p>
                <div className="text-5xl font-extrabold text-gray-900">${funnel.price}</div>
             </div>
             
             {/* CLIENT COMPONENT FOR PAYMENT */}
             <PaymentButton 
                price={funnel.price} 
                funnelId={funnel.id} 
                colorClass={getButtonColor(funnel.theme || "blue")}
             />
             
             <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle size={14} className="text-green-500" /> Secure SSL Payment
             </div>
          </div>
       </div>
    </div>
  );
}
