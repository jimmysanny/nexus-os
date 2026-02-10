import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-0.5">
          <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
            NEXUS
          </span>
          <span className="text-2xl font-bold text-primary">.</span>
        </Link>
        <h1 className="mt-4 font-heading text-xl font-bold text-foreground">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to access your client portal
        </p>
      </div>
      <SignIn
        afterSignInUrl="/dashboard"
        appearance={{
          elements: {
            card: "bg-card border border-border shadow-xl",
            headerTitle: "text-foreground",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary:
              "bg-primary hover:brightness-110 text-primary-foreground",
            footerActionLink: "text-primary hover:text-primary/80",
            formFieldLabel: "text-foreground",
            formFieldInput:
              "bg-background border-border text-foreground",
            footer: "bg-card",
            socialButtonsBlockButton:
              "bg-secondary border-border text-foreground hover:bg-muted",
            socialButtonsBlockButtonText: "text-foreground",
          },
        }}
      />
    </div>
  );
}
