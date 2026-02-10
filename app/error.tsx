"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
      >
        Try Again
      </button>
    </div>
  );
}
