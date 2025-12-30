import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-full w-full overflow-x-hidden">
      <div className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Account Settings</h2>
        <p className="text-slate-400 text-sm md:text-base">Manage your profile, security, and preferences.</p>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 w-full overflow-hidden">
        <UserProfile 
          routing="hash" 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none w-full max-w-full",
              navbar: "hidden", // Keeps it simple
              pageScrollBox: "p-4 md:p-6", // Adds breathing room inside
              scrollBox: "w-full max-w-full"
            },
            variables: {
              colorBackground: "#0f172a", 
              colorText: "white",
              colorInputBackground: "#1e293b",
              colorInputText: "white",
              colorPrimary: "#4f46e5",
              borderRadius: "0.5rem"
            }
          }}
        />
      </div>
    </div>
  );
}
