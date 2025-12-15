"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handle = (e: any) => {
    e.preventDefault();
    // Simulate signup
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Create your account</h2>
        <form onSubmit={handle} className="space-y-4">
            <div>
                <label className="text-sm text-gray-400 block mb-2">Email Address</label>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:border-blue-500 outline-none transition" placeholder="you@company.com" />
            </div>
            <div>
                <label className="text-sm text-gray-400 block mb-2">Password</label>
                <input required type="password" className="w-full bg-black border border-gray-700 rounded-lg p-3 focus:border-blue-500 outline-none transition" placeholder="••••••••" />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">Sign Up Free</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
            By joining, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
}