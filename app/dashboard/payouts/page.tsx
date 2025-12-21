import PageHeader from "@/components/PageHeader";

export default function PayoutsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Financials" subtitle="Creator Payouts" />
      <div className="bg-white p-12 rounded-[32px] border border-dashed border-slate-200 text-center">
        <p className="text-slate-400">Payout history will appear here once you start generating revenue.</p>
      </div>
    </div>
  );
}