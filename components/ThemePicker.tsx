"use client";
import { THEMES } from "@/lib/themes";
import { updateFunnel } from "@/app/actions/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThemePicker({ funnelId, currentTheme }: { funnelId: string, currentTheme: string }) {
  const [selected, setSelected] = useState(currentTheme || "blue");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelect = async (key: string) => {
    setSelected(key);
    setLoading(true);
    await updateFunnel(funnelId, { themeColor: key });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span>🎨</span> Brand Appearance
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`group relative w-full aspect-square rounded-xl border-2 transition-all ${selected === key ? "border-slate-900 scale-105" : "border-transparent hover:scale-105"}`}
          >
            <div className={`w-full h-full rounded-lg ${theme.primary} opacity-80 group-hover:opacity-100 shadow-sm`}></div>
            {selected === key && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold"></div>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center font-medium">
        {THEMES[selected]?.name || "Default"} Theme
      </p>
    </div>
  );
}