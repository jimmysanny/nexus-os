"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="flex justify-center p-8 w-full">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
        
        {/* CLERK'S MAGIC COMPONENT */}
        {/* This handles Photos, Emails, Passwords, and Security automatically */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <UserProfile 
                path="/dashboard/settings"
                routing="path"
                appearance={{
                    variables: {
                        colorBackground: "#111827", // Matches our dark mode
                        colorText: "white",
                        colorPrimary: "#2563eb",
                        colorInputBackground: "#1f2937",
                        colorInputText: "white",
                        colorTextSecondary: "#9ca3af",
                    },
                    elements: {
                        card: "shadow-none border-0",
                        navbar: "border-r border-gray-700",
                        navbarButton: "text-gray-400 hover:text-white",
                        headerTitle: "text-white",
                        headerSubtitle: "text-gray-400"
                    }
                }}
            />
        </div>
      </div>
    </div>
  );
}
