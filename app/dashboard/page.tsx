import Link from 'next/link'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { DollarSign, Users, Briefcase, TrendingUp, ArrowRight, CreditCard, ShoppingBag } from 'lucide-react'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return <div>Not authenticated</div>

  // 1. FETCH DATA PARALLEL (Fast Loading)
  // We grab counts from your new Database tables
  const [clientCount, projectCount, invoices, funnels] = await Promise.all([
    db.client.count({ where: { userId } }),
    db.project.count({ where: { userId, status: "In Progress" } }),
    db.invoice.findMany({ 
      where: { userId }, 
      orderBy: { createdAt: 'desc' }, 
      take: 5,
      include: { client: true }
    }),
    db.funnel.findMany({
      where: { userId },
      include: { orders: true }
    })
  ])

  // 2. CALCULATE MONEY
  // Sum of all Invoices
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.amount, 0)
  
  // Sum of all Store Orders
  const totalStoreSales = funnels.reduce((acc, funnel) => {
    return acc + funnel.orders.reduce((orderAcc, order) => orderAcc + order.amount, 0)
  }, 0)

  // SaaS Total Revenue (Agency + Store)
  const totalRevenue = totalInvoiced + totalStoreSales

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Command Center</h1>
          <p className="text-gray-500">Welcome back. Here is your business overview.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
           {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/*  STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* REVENUE CARD */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between hover:shadow-md transition">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">Total Net</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">KES {totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        {/* CLIENTS CARD */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Clients</p>
            <h3 className="text-3xl font-bold text-gray-900">{clientCount}</h3>
          </div>
        </div>

        {/* PROJECTS CARD */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <Briefcase size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Projects</p>
            <h3 className="text-3xl font-bold text-gray-900">{projectCount}</h3>
          </div>
        </div>

        {/* STORE SALES CARD */}
         <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between hover:shadow-md transition">
           <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <ShoppingBag size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Store Sales</p>
            <h3 className="text-3xl font-bold text-gray-900">KES {totalStoreSales.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECENT INVOICES */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">Recent Invoices</h3>
            <Link href="/dashboard/invoices" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="divide-y">
            {invoices.length === 0 ? (
               <div className="p-8 text-center text-gray-500">No invoices generated yet.</div>
            ) : (
              invoices.map((inv) => (
                <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                        {inv.client.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{inv.client.name}</p>
                        <p className="text-xs text-gray-500">Due: {inv.dueDate.toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="font-bold text-gray-900">KES {inv.amount.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {inv.status}
                      </span>
                   </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-md p-6 text-white flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2">Quick Actions</h3>
            <p className="text-blue-100 mb-6 text-sm">Run your business efficiently.</p>
          </div>
          
          <div className="space-y-3">
            <Link href="/dashboard/invoices/new" className="block w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition">
               <CreditCard size={20} /> <span className="font-medium">Create Invoice</span>
            </Link>
            <Link href="/dashboard/clients/new" className="block w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition">
               <Users size={20} /> <span className="font-medium">Add New Client</span>
            </Link>
            <Link href="/dashboard/projects/new" className="block w-full bg-white/10 hover:bg-white/20 p-3 rounded-lg flex items-center gap-3 transition">
               <Briefcase size={20} /> <span className="font-medium">Start Project</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
