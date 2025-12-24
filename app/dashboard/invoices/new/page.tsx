import { createInvoice } from "../actions"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export default async function NewInvoicePage() {
  const { userId } = await auth()
  const clients = await db.client.findMany({ where: { userId: userId! } })
  const projects = await db.project.findMany({ where: { userId: userId! } })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
      <form action={createInvoice} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <select name="clientId" required className="w-full p-2 border rounded-lg bg-white">
              <option value="">-- Select Client --</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project (Optional)</label>
            <select name="projectId" className="w-full p-2 border rounded-lg bg-white">
              <option value="">-- General / None --</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
           <input name="amount" type="number" required placeholder="0.00" className="w-full p-2 border rounded-lg" />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
           <input name="dueDate" type="date" required className="w-full p-2 border rounded-lg" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Generate Invoice & Link
        </button>
      </form>
    </div>
  )
}
