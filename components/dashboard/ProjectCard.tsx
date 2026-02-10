import { cn } from "@/lib/utils";
import { Calendar, User } from "lucide-react";

interface ProjectCardProps {
  name: string;
  service: string;
  status: string;
  progress: number;
  dueDate: string | null;
  assignedTo: string | null;
}

const statusColors: Record<string, string> = {
  "In Progress": "border-primary/20 bg-primary/10 text-primary",
  Review: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  Completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  "On Hold": "border-muted bg-muted text-muted-foreground",
};

export default function ProjectCard({
  name,
  service,
  status,
  progress,
  dueDate,
  assignedTo,
}: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading text-base font-semibold text-foreground">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{service}</p>
        </div>
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
            statusColors[status] || statusColors["On Hold"]
          )}
        >
          {status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-center gap-4">
        {dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar size={12} />
            {dueDate}
          </div>
        )}
        {assignedTo && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User size={12} />
            {assignedTo}
          </div>
        )}
      </div>
    </div>
  );
}
