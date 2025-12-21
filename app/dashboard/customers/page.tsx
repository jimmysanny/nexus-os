import PageHeader from "@/components/PageHeader";

export default function CustomersPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Customers" subtitle="Your buyer list" />
      <div className="bg-white p-12 rounded-[32px] border border-dashed border-slate-200 text-center">
        <p className="text-slate-400">Customer CRM coming soon.</p>
      </div>
    </div>
  );
}