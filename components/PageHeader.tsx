export default function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
      {subtitle && <p className="text-slate-500 mt-1 text-sm font-medium">{subtitle}</p>}
    </div>
  );
}