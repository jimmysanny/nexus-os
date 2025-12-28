import { createFunnel } from "@/app/actions/funnels";

export default function NewFunnelPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Funnel</h1>
      
      <form action={createFunnel} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input 
            name="name" 
            type="text" 
            required 
            className="w-full p-2 border rounded bg-slate-900 border-slate-700" 
            placeholder="e.g., Digital Marketing Masterclass"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Headline</label>
          <input 
            name="headline" 
            type="text" 
            className="w-full p-2 border rounded bg-slate-900 border-slate-700" 
            placeholder="Catchy tagline..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            name="description" 
            className="w-full p-2 border rounded bg-slate-900 border-slate-700" 
            placeholder="Product details..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (KES)</label>
          <input 
            name="price" 
            type="number" 
            step="0.01" 
            required 
            className="w-full p-2 border rounded bg-slate-900 border-slate-700" 
            placeholder="1000"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
