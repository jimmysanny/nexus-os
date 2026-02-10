import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Paid: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Pending: "border-primary/20 bg-primary/10 text-primary",
  Overdue: "border-destructive/20 bg-destructive/10 text-destructive",
};

export default async function InvoicesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const invoices = await prisma.invoice.findMany({
    where: { clientId: userId },
    include: { project: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Invoices
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage your invoices and payment history.
        </p>
      </div>

      {invoices.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <FileText size={40} className="mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            No invoices yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your invoices will appear here once billing begins.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition-colors hover:bg-card/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {invoice.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {invoice.project.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        statusColors[invoice.status] || statusColors["Pending"]
                      )}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {format(new Date(invoice.createdAt), "MMM d, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
