"use client";
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

export const useTenant = () => useContext(TenantContext);