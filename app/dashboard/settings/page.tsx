"use client";
import { useState, useEffect } from "react";
import DashboardNav from "@/components/DashboardNav";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ username: "", name: "", bio: "" });
  const [loading, setLoading] = useState(true);

  // Fetch existing profile
  useEffect(() => {
    fetch("/api/merchant").then(res => res.json()).then(data => {
      if (data) setProfile(data);
      setLoading(false);
    });
  }, []);

  const save = async () => {
    const res = await fetch("/api/merchant", {
      method: "POST",
      body: JSON.stringify(profile)
    });
    if (res.ok) alert("Profile Saved!");
    else alert("Username might be taken.");
  };

  if (loading) return <div className="p-20">Loading settings...</div>;

  return (
    <div>
      <DashboardNav title="Store Settings" subtitle="Manage your public identity" />
      
      <div className="max-w-2xl bg-white p-8 rounded-[40px] border border-slate-100 space-y-6">
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
           <h3 className="text-blue-900 font-black mb-1">Your Store URL</h3>
           <p className="text-blue-600 font-mono text-sm">
             nexus.ke/u/<span className="font-black">{profile.username || "username"}</span>
           </p>
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Username (Unique)</label>
           <input 
             value={profile.username}
             onChange={(e) => setProfile({...profile, username: e.target.value.toLowerCase().replace(/\s/g, "")})} 
             placeholder="e.g. james"
             className="w-full p-4 bg-slate-50 rounded-2xl font-black text-slate-900 outline-none"
           />
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</label>
           <input 
             value={profile.name}
             onChange={(e) => setProfile({...profile, name: e.target.value})} 
             placeholder="e.g. James Tech"
             className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none"
           />
        </div>

        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bio</label>
           <textarea 
             value={profile.bio || ""}
             onChange={(e) => setProfile({...profile, bio: e.target.value})} 
             placeholder="Tell customers about yourself..."
             className="w-full p-4 bg-slate-50 rounded-2xl font-medium text-slate-600 outline-none h-32"
           />
        </div>

        <button onClick={save} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
           Save Profile
        </button>
      </div>
    </div>
  );
}