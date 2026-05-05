import type { ProjectData } from "@/lib/data/projects";

interface Dict {
  label: string;
  t1: string;
  t2: string;
  left: string;
}

interface Props {
  content: ProjectData["pt"];
  dict: Dict;
}

export default function ProjectBuild({ content, dict }: Props) {
  return (
    <section className="px-8 py-25 border-b-[1.5px] border-ink max-md:px-5 max-md:py-15">
      <div className="section-label">{dict.label}</div>

      <h2
        className="uppercase mb-10"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "clamp(36px, 7vw, 80px)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        {dict.t1} <em className="text-accent italic">{dict.t2}</em>
      </h2>

      {/* Corpo 2-col */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-15 items-start max-w-[1400px] max-md:grid-cols-1 max-md:gap-6">
        <div
          className="text-[12px] uppercase tracking-[0.08em] text-muted pt-2 max-md:hidden"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {dict.left}
        </div>
        <div className="about-text">
          {content.build.map((p, i) => (
            <p
              key={i}
              className={`text-[19px] leading-[1.55] max-w-[720px] max-md:text-[17px] ${i > 0 ? "mt-[18px]" : ""}`}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      </div>

      {/* Grelha de features */}
      <div className="grid border-l-[1.5px] border-t-[1.5px] border-ink mt-8 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
        {content.features.map((f, i) => (
          <div
            key={f.name}
            className="border-r-[1.5px] border-b-[1.5px] border-ink px-7 py-7 transition-colors duration-250 hover:bg-accent hover:text-bg"
          >
            <div
              className="text-[12px] opacity-60 mb-2"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className="text-[20px] uppercase mb-3 leading-[1.1]"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              {f.name}
            </div>
            <div className="text-[14px] leading-[1.5]">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
