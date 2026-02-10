export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 rounded bg-secondary" />
        <div className="mt-2 h-4 w-80 rounded bg-secondary" />
      </div>

      {/* Stats skeleton */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5"
          >
            <div className="h-10 w-10 rounded-lg bg-secondary" />
            <div>
              <div className="h-3 w-16 rounded bg-secondary" />
              <div className="mt-2 h-6 w-12 rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>

      {/* Projects skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-6"
          >
            <div className="h-5 w-40 rounded bg-secondary" />
            <div className="mt-2 h-3 w-24 rounded bg-secondary" />
            <div className="mt-6 h-1.5 rounded-full bg-secondary" />
            <div className="mt-4 flex gap-4">
              <div className="h-3 w-24 rounded bg-secondary" />
              <div className="h-3 w-20 rounded bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
