import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <p className="font-heading text-8xl font-bold text-border">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        {"The page you're looking for doesn't exist or has been moved."}
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
      >
        Go Home
      </Link>
    </div>
  );
}
