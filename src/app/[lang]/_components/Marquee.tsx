const items = [
  "HTML", "CSS", "JAVASCRIPT", "TYPESCRIPT", "PHP",
  "REACT", "NEXT.JS", "TAILWIND", "SQL",
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap border-t-[1.5px] border-b-[1.5px] border-ink bg-ink text-bg py-4 leading-none uppercase text-[80px] max-md:text-[48px]"
      style={{ fontFamily: "var(--font-archivo)" }}
      aria-hidden="true"
    >
      <div className="inline-flex gap-10 animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            {item}
            <span className="text-accent">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
