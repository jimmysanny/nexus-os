import { createProject } from "../actions"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export default async function NewProjectPage() {
  const { userId } = await auth()
  const clients = await db.client.findMany({
    where: { userId: userId! }
  })

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Start New Project</h1>
      <form action={createProject} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
          <input name="name" required placeholder="e.g. Website Redesign" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
          <select name="clientId" required className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">-- Choose a Client --</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
           <input name="budget" type="number" placeholder="0.00" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows={3} className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Create Project
        </button>
      </form>
    </div>
  )
}
