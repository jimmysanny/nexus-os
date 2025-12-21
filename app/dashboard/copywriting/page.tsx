import DashboardNav from "@/components/DashboardNav";
export default function CopywritingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <DashboardNav title="AI Copywriting" subtitle="Generate sales copy for your funnels" />
      <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-slate-700">AI Writer Ready</h3>
        <p className="text-slate-500">Select a funnel to generate high-converting headlines.</p>
      </div>
    </div>
  );
}