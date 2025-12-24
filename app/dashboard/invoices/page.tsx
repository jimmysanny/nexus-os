import Link from 'next/link'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { Receipt, Plus, ExternalLink } from 'lucide-react'

export default async function InvoicesPage() {
  const { userId } = await auth()
  
  const invoices = await db.invoice.findMany({
    where: { userId: userId! },
    include: { client: true, project: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
         <Link href="/dashboard/invoices/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition flex items-center gap-2">
            <Plus size={18} /> New Invoice
         </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm divide-y overflow-hidden">
        {invoices.length === 0 ? (
           <div className="p-12 text-center text-gray-500 bg-gray-50">
             <p>No invoices yet.</p>
           </div>
        ) : (
          invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:bg-gray-50 transition">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-green-50 rounded-lg text-green-600"><Receipt size={24} /></div>
                 <div>
                   <p className="font-bold text-gray-800"></p>
                   <p className="text-sm text-gray-500">{inv.client.name}  {inv.project?.name || 'General'}</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                     <span className={lock text-xs font-bold px-2 py-1 rounded-full mb-1 \}>
                       {inv.status}
                     </span>
                     <p className="text-xs text-gray-400">Due: {inv.dueDate.toLocaleDateString()}</p>
                  </div>
                  
                  {inv.paymentLink ? (
                    <a href={inv.paymentLink} target="_blank" className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-bold border border-blue-200">
                       <ExternalLink size={16} /> Pay Link
                    </a>
                  ) : (
                     <span className="text-xs text-gray-400 italic">No Link</span>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
