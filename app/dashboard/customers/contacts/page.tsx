import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DashboardNav";
import MarketingTool from "@/components/MarketingTool";

export default async function ContactsPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // SECURITY FIX: Only fetch orders for products OWNED by this user
  const orders = await prisma.order.findMany({
    where: { 
      status: "SUCCESS",
      funnel: { userId: user.id } 
    },
    include: { funnel: true },
    orderBy: { createdAt: "desc" }
  });

  const uniqueEmails = Array.from(new Set(orders.map(o => o.customerEmail)));
  const emailString = uniqueEmails.join(", ");

  return (
    <div>
      <DashboardNav title="Customers" subtitle="Your buyer list" />
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr><th className="px-10 py-6">Email Address</th><th className="px-10 py-6 text-right">Total Spent (KES)</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {uniqueEmails.map((email, i) => {
                const total = orders.filter(o => o.customerEmail === email).reduce((s, o) => s + o.amount, 0);
                return (
                  <tr key={i}><td className="px-10 py-8 font-bold text-slate-900">{email}</td><td className="px-10 py-8 text-right font-black italic">KES {total.toLocaleString()}</td></tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <MarketingTool emailList={emailString} />
      </div>
    </div>
  );
}