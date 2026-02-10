const items = [
  "Web Design",
  "SEO",
  "Copywriting",
  "Full Stack Dev",
  "Brand Identity",
  "Digital Marketing",
  "E-Commerce",
  "Google Ads",
];

export default function TickerBanner() {
  return (
    <div className="overflow-hidden border-y border-primary/20 bg-primary/5 py-4">
      <div className="animate-ticker flex w-max gap-8">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 whitespace-nowrap font-heading text-sm font-medium uppercase tracking-widest text-primary"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
