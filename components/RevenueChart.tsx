"use client";

export default function RevenueChart({ data }: { data: { day: string; amount: number }[] }) {
  const max = Math.max(...data.map(d => d.amount), 100); // Find highest day to scale bars

  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-900">Revenue Trends</h3>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Last 7 Days Performance</p>
        </div>
        <div className="flex gap-2">
           <span className="w-3 h-3 rounded-full bg-blue-600"></span>
           <span className="text-[10px] font-bold text-slate-500">Sales Volume</span>
        </div>
      </div>

      {/* THE CHART */}
      <div className="h-64 flex items-end justify-between gap-2 md:gap-4">
        {data.map((item, i) => {
          // Calculate height percentage relative to the max day
          const height = (item.amount / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer">
              
              {/* Tooltip (Hover) */}
              <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-8 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none">
                KES {item.amount.toLocaleString()}
              </div>

              {/* The Bar */}
              <div 
                className="w-full bg-blue-100 rounded-t-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-blue-200"
                style={{ height: `${height}%`, minHeight: "10%" }}
              >
                 <div className="absolute bottom-0 left-0 right-0 bg-blue-600 h-2 opacity-20"></div>
                 {/* Fill animation */}
                 <div className="w-full h-full bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
              
              {/* The Label */}
              <span className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}