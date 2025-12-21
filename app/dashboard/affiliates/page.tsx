import DashboardNav from "@/components/DashboardNav";
export default function AffiliatesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardNav title="Affiliate Center" subtitle="Manage your promoters" />
       <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-slate-700">Affiliate Network</h3>
        <p className="text-slate-500">Tracking system is active. No active affiliates yet.</p>
      </div>
    </div>
  );
}