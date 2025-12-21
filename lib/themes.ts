export const THEMES: Record<string, { name: string, primary: string, secondary: string, accent: string, bg: string }> = {
  blue: { 
    name: "Nexus Blue", 
    primary: "bg-blue-600", 
    secondary: "bg-blue-50", 
    accent: "text-blue-600",
    bg: "bg-slate-50"
  },
  emerald: { 
    name: "Wealth Green", 
    primary: "bg-emerald-600", 
    secondary: "bg-emerald-50", 
    accent: "text-emerald-600",
    bg: "bg-stone-50"
  },
  violet: { 
    name: "Digital Purple", 
    primary: "bg-violet-600", 
    secondary: "bg-violet-50", 
    accent: "text-violet-600",
    bg: "bg-slate-50"
  },
  rose: { 
    name: "Energy Red", 
    primary: "bg-rose-600", 
    secondary: "bg-rose-50", 
    accent: "text-rose-600",
    bg: "bg-orange-50/30"
  },
  amber: { 
    name: "Gold Standard", 
    primary: "bg-amber-500", 
    secondary: "bg-amber-50", 
    accent: "text-amber-600",
    bg: "bg-yellow-50/20"
  }
};

export const getTheme = (color?: string | null) => {
  return THEMES[color || "blue"] || THEMES["blue"];
};