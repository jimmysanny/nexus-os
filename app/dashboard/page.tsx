import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FolderKanban, CheckCircle, Clock, DollarSign } from "lucide-react";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const [projects, invoices] = await Promise.all([
    prisma.project.findMany({
      where: { clientId: userId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.invoice.findMany({
      where: { clientId: userId },
    }),
  ]);

  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const totalSpent = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects.toString(),
      icon: FolderKanban,
    },
    {
      label: "Completed",
      value: completed.toString(),
      icon: CheckCircle,
    },
    {
      label: "In Progress",
      value: inProgress.toString(),
      icon: Clock,
    },
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: DollarSign,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here is an overview of your projects.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="font-heading text-xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Your Projects
        </h2>
        {projects.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <FolderKanban
              size={40}
              className="mx-auto text-muted-foreground"
            />
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
              No projects yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {
                "Your projects will appear here once we start working together."
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                service={project.service}
                status={project.status}
                progress={project.progress}
                dueDate={
                  project.dueDate
                    ? format(new Date(project.dueDate), "MMM d, yyyy")
                    : null
                }
                assignedTo={project.assignedTo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
