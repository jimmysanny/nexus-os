import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { createInvoice } from "./action"

export default async function NewInvoicePage() {
  const { userId } = await auth()
  const clients = await db.client.findMany({ where: { userId } })

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>
      
      <form action={createInvoice} className="space-y-6 bg-white p-8 rounded-xl border shadow-sm">
        
        {/* CLIENT SELECTOR */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Client</label>
          <select name="clientId" className="w-full p-3 border rounded-lg bg-gray-50" required>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
            ))}
          </select>
        </div>

        {/* SERVICE DETAILS */}
        <div>
          <label className="block text-sm font-medium mb-2">Description of Work</label>
          <input name="description" type="text" placeholder="e.g. Website Redesign" className="w-full p-3 border rounded-lg" required />
        </div>

        {/* MONEY */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount (KES)</label>
            <input name="amount" type="number" placeholder="50000" className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Due Date</label>
            <input name="dueDate" type="date" className="w-full p-3 border rounded-lg" required />
          </div>
        </div>

        <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">
          Generate & Email Invoice
        </button>
      </form>
    </div>
  )
}
