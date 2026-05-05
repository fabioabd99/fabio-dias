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

export default function ProjectAbout({ content, dict }: Props) {
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

      {/* Layout 2-col: label mono à esquerda, parágrafos à direita */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-15 items-start max-w-[1400px] max-md:grid-cols-1 max-md:gap-6">
        <div
          className="text-[12px] uppercase tracking-[0.08em] text-muted pt-2 max-md:hidden"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {dict.left}
        </div>
        <div className="about-text">
          {content.about.map((p, i) => (
            <p
              key={i}
              className={`text-[19px] leading-[1.55] max-w-[720px] max-md:text-[17px] ${i > 0 ? "mt-[18px]" : ""}`}
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
