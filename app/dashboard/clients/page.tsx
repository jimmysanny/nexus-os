'use client';
export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-800">My Clients</h1>
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">+ New Client</button>
      </div>
      <div className="bg-white border rounded-xl shadow-sm divide-y overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50 transition cursor-pointer">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">C{i}</div>
               <div>
                 <p className="font-semibold text-gray-800">Nexus Client {i}</p>
                 <p className="text-sm text-gray-500">client{i}@nexusos.africa</p>
               </div>
             </div>
             <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
}
