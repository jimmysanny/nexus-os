import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export default async function WalletPage() {
  const user = await currentUser();
  const funnels = await prisma.funnel.findMany({
    where: { userId: user?.id },
    include: { orders: true }
  });

  const totalRevenue = funnels.reduce((acc, f) => acc + f.orders.reduce((sum, o) => sum + o.amount, 0), 0);
  const recentOrders = funnels.flatMap(f => f.orders).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Card & Balance */}
      <div className="lg:col-span-1 space-y-6">
         <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">��</div>
            <div className="relative z-10">
               <p className="text-slate-400 font-medium text-sm mb-1">Available Balance</p>
               <h2 className="text-4xl font-black tracking-tight mb-8">KES {totalRevenue.toLocaleString()}</h2>
               <div className="flex justify-between items-end">
                  <div>
                     <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Card Holder</p>
                     <p className="font-bold">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">Expires</p>
                     <p className="font-bold">12/28</p>
                  </div>
               </div>
            </div>
         </div>
         <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            Request Payout
         </button>
      </div>

      {/* Right Column: Transaction History */}
      <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
         <h3 className="font-bold text-lg text-slate-900 mb-6">Recent Transactions</h3>
         {recentOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
               <p>No transactions yet.</p>
            </div>
         ) : (
            <div className="space-y-4">
               {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold"></div>
                        <div>
                           <p className="font-bold text-slate-900">Product Sale</p>
                           <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <p className="font-bold text-green-600">+ KES {order.amount.toLocaleString()}</p>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
}