import type { ProjectData } from "@/lib/data/projects";

interface Dict {
  label: string;
  t1: string;
  t2: string;
}

interface Props {
  project: ProjectData;
  dict: Dict;
}

export default function ProjectResults({ project, dict }: Props) {
  return (
    <section className="px-8 py-25 border-b-[1.5px] border-ink max-md:px-5 max-md:py-15">
      <div className="section-label">{dict.label}</div>

      <h2
        className="uppercase mb-8"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "clamp(36px, 7vw, 80px)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        {dict.t1} <em className="text-accent italic">{dict.t2}</em>
      </h2>

      {/* Grelha 3-col: fundo escuro, número grande em accent */}
      <div className="grid grid-cols-3 border-l-[1.5px] border-t-[1.5px] border-ink mt-8 max-md:grid-cols-1">
        {project.results.map((r) => (
          <div
            key={r.label}
            className="border-r-[1.5px] border-b-[1.5px] border-ink px-7 py-10 bg-ink text-bg"
          >
            <div
              className="text-accent leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(48px, 6vw, 80px)",
                letterSpacing: "-0.03em",
              }}
            >
              {r.big}
            </div>
            <div
              className="text-[12px] uppercase tracking-[0.08em] mt-3 opacity-70"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {r.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
