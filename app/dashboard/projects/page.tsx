import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { FolderKanban } from "lucide-react";

export default async function ProjectsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const projects = await prisma.project.findMany({
    where: { clientId: userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Projects
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track the status and progress of all your active projects.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <FolderKanban size={40} className="mx-auto text-muted-foreground" />
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            No projects yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {"Your projects will appear here once we start working together."}
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
  );
}
