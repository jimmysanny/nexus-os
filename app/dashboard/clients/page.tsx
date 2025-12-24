import Link from 'next/link'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export default async function ClientsPage() {
  const { userId } = await auth()
  
  const clients = await db.client.findMany({
    where: { userId: userId! },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-800">My Clients</h1>
         <Link href="/dashboard/clients/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition">
            + New Client
         </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm divide-y overflow-hidden">
        {clients.length === 0 ? (
           <div className="p-12 text-center text-gray-500 bg-gray-50">
             <p className="mb-2">No clients found.</p>
             <p className="text-sm">Click the button above to add your first client.</p>
           </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {client.name.substring(0,2).toUpperCase()}
                 </div>
                 <div>
                   <p className="font-semibold text-gray-800">{client.name}</p>
                   <p className="text-sm text-gray-500">{client.email}</p>
                 </div>
               </div>
               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                 {client.status}
               </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
