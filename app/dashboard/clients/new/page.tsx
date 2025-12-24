import { createClient } from "../actions"

export default function NewClientPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Add New Client</h1>
      </div>
      <form action={createClient} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
          <input name="name" required placeholder="e.g. Acme Corp" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input name="email" type="email" required placeholder="client@company.com" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input name="phone" placeholder="+254..." className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Save Client
        </button>
      </form>
    </div>
  )
}
