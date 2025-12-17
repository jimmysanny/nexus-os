"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <SignIn routing="hash" />
    </div>
  );
}