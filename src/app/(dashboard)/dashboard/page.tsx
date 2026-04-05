import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { BookOpen, Users, DollarSign, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  const tenant = await db.tenant.findFirst({ where: { ownerId: userId! } });

  const [courseCount, studentCount, payments] = await Promise.all([
    tenant ? db.course.count({ where: { tenantId: tenant.id } }) : 0,
    tenant ? db.enrollment.count({ where: { tenantId: tenant.id } }) : 0,
    tenant
      ? db.payment.findMany({ where: { tenantId: tenant.id, status: "SUCCESS" } })
      : [],
  ]);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Total Courses", value: courseCount, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Students", value: studentCount, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Revenue (KES)", value: `${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Payments", value: payments.length, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B2A4A]">
          {tenant ? `${tenant.name}` : "Welcome to Nexus OS"}
        </h1>
        <p className="text-gray-500 mt-1">Here's your platform overview</p>
      </div>

      {!tenant && (
        <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-[#1B2A4A]">Set up your school</h2>
          <p className="text-sm text-gray-600 mt-1">
            You haven't created a tenant yet. Set up your school to start publishing courses.
          </p>
          <a href="/dashboard/settings" className="mt-3 inline-block text-sm font-medium text-[#C9A84C] hover:underline">
            Create your school →
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-[#1B2A4A]">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
