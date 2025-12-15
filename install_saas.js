const fs = require('fs');
const path = require('path');

console.log("🚀 Injecting Nexus OS SaaS Engine...");

const files = {
  // 1. Environment Variables
  '.env.local': `NEXT_PUBLIC_FIREBASE_API_KEY=dummy
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dummy
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dummy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dummy
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=dummy
NEXT_PUBLIC_FIREBASE_APP_ID=dummy
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_12345
PAYSTACK_SECRET_KEY=sk_test_12345
NEXT_PUBLIC_ROOT_DOMAIN=localhost:3000`,

  // 2. Firebase Config
  'lib/firebase.ts': `import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);`,

  // 3. The Tenant Brain (Handles Subdomains)
  'contexts/TenantContext.tsx': `"use client";
import { createContext, useContext, useEffect, useState } from "react";

const TenantContext = createContext<any>(null);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Detect Subdomain
    const hostname = typeof window !== "undefined" ? window.location.hostname : "";
    let subdomain = hostname.split(".")[0];
    
    // For localhost testing, treat 'localhost' as 'demo'
    if (hostname === "localhost" || hostname.includes("vercel.app")) subdomain = "demo";

    // 2. Load Tenant Data (Simulation for now)
    setTenant({
        id: subdomain,
        name: subdomain === 'demo' ? 'Nexus Demo' : subdomain.toUpperCase() + ' Corp',
        plan: 'pro',
        currency: 'KES'
    });
    setLoading(false);
  }, []);

  return <TenantContext.Provider value={{ tenant, loading }}>{children}</TenantContext.Provider>;
}

export const useTenant = () => useContext(TenantContext);`,

  // 4. The Global Layout
  'app/layout.tsx': `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TenantProvider } from "@/contexts/TenantContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus OS",
  description: "Operating System for African Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TenantProvider>{children}</TenantProvider>
      </body>
    </html>
  );
}`,

  // 5. The High-Converting Landing Page
  'app/page.tsx': `import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-sm text-gray-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> v1.0 Live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
          Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Digital Empire</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Nexus OS is the complete platform for African creators and consultants. Build funnels, collect payments, and host courses in minutes.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
            <Link href="/signup" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8 py-4 rounded-full transition flex items-center gap-2">
                Start Free Trial <ArrowRight size={20}/>
            </Link>
            <Link href="/demo" className="border border-gray-700 hover:bg-gray-900 text-white font-bold text-lg px-8 py-4 rounded-full transition">
                View Live Demo
            </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <Globe className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Custom Website</h3>
            <p className="text-gray-400">Get your own professional link (e.g., jane.nexus-os.com) instantly.</p>
        </div>
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <ShieldCheck className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-400">Accept M-Pesa and Cards globally via our integrated Paystack gateway.</p>
        </div>
        <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <CheckCircle2 className="text-purple-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Course Portal</h3>
            <p className="text-gray-400">Upload your masterclass and let the system handle access automatically.</p>
        </div>
      </div>
    </div>
  );
}`,

  // 6. Signup Page
  'app/(auth)/signup/page.tsx': `"use client";
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
}`,

  // 7. Onboarding (Claim Subdomain)
  'app/onboarding/page.tsx': `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Onboarding() {
  const [subdomain, setSubdomain] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const claim = async () => {
    if(!subdomain) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        alert("🎉 Site Claimed: " + subdomain + ".nexus-os.com");
        router.push("/dashboard"); // Next step
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Name your business</h1>
        <p className="text-gray-400 mb-8 text-lg">Choose the link your customers will visit.</p>
        
        <div className="bg-gray-900 border border-gray-800 p-2 rounded-xl flex items-center mb-8">
            <input 
                value={subdomain}
                onChange={e=>setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                className="bg-transparent flex-1 p-4 text-xl outline-none font-mono"
                placeholder="mybrand"
            />
            <span className="text-gray-500 pr-4 font-mono">.nexus-os.com</span>
        </div>

        <button onClick={claim} disabled={loading} className="w-full bg-white text-black hover:bg-gray-200 font-bold text-xl py-4 rounded-xl flex items-center justify-center gap-2 transition">
            {loading ? <Loader2 className="animate-spin"/> : <>Launch Site <ArrowRight/></>}
        </button>
      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filePath, content]) => {
  const dirName = path.dirname(filePath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
    console.log("Created folder: " + dirName);
  }
  fs.writeFileSync(filePath, content);
  console.log("Created file: " + filePath);
});

console.log("\n✅ Nexus OS Engine Injected!");
console.log("👉 Run: npm run dev");