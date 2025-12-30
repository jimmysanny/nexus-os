'use client'
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#000000' }}>
      <div style={{ padding: '20px', backgroundColor: '#333', borderRadius: '10px' }}>
        <h1 style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>System Access</h1>
        {/* RENDER RAW COMPONENT - NO CUSTOM THEME */}
        <SignIn />
      </div>
    </div>
  );
}