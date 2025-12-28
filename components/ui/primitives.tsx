import { cn } from "@/lib/utils";
export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={cn("bg-slate-900 border border-slate-800 rounded-xl overflow-hidden", className)}>{children}</div>;
}
export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default'|'success' }) {
  const colors = variant === 'success' ? "bg-green-900 text-green-300 border-green-700" : "bg-slate-800 text-slate-300 border-slate-700";
  return <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${colors}`}>{children}</span>;
}
