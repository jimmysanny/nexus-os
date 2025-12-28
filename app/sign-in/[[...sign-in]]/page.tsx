'use client'
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your Nexus OS</p>
        </div>
        
        {/* The Clerk Login Box */}
        <SignIn appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-slate-900 border border-slate-800 text-white",
            headerTitle: "text-white",
            headerSubtitle: "text-slate-400",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500",
            formFieldLabel: "text-slate-300",
            formFieldInput: "bg-slate-950 border-slate-800 text-white",
            footerActionLink: "text-indigo-400 hover:text-indigo-300"
          }
        }} />
      </div>
    </div>
  );
}