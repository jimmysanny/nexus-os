import Link from 'next/link'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { FolderKanban, Plus } from 'lucide-react'

export default async function ProjectsPage() {
  const { userId } = await auth()
  
  const projects = await db.project.findMany({
    where: { userId: userId! },
    include: { client: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
            <p className="text-gray-500">Track your active work.</p>
         </div>
         <Link href="/dashboard/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition flex items-center gap-2">
            <Plus size={18} /> New Project
         </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? (
           <div className="col-span-full p-12 text-center text-gray-500 bg-gray-50 border rounded-xl">
             <p>No projects yet.</p>
           </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <FolderKanban size={24} />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {project.status}
                  </span>
               </div>
               <h3 className="font-bold text-lg text-gray-800 mb-1">{project.name}</h3>
               <p className="text-sm text-gray-500 mb-4">Client: {project.client.name}</p>
               
               <div className="pt-4 border-t flex justify-between items-center text-sm">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-bold text-gray-900"></span>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
