import type { ProjectData } from "@/lib/data/projects";

interface Dict {
  label: string;
  t1: string;
  t2: string;
  cta: string;
}

interface Props {
  project: ProjectData;
  dict: Dict;
}

export default function ProjectStack({ project, dict }: Props) {
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

      {/* Chips de tecnologia */}
      <div className="flex flex-wrap gap-2 mt-8">
        {project.chips.map((chip) => (
          <span
            key={chip}
            className="border-[1.5px] border-ink px-3.5 py-2 text-[12px] uppercase tracking-[0.05em] transition-colors duration-200 hover:bg-ink hover:text-bg"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* CTA para o repo — escondido se for privado */}
      {project.repo.startsWith("github.com/") && (
        <a
          href={`https://${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 mt-8 bg-accent text-ink px-6 py-4 uppercase tracking-wider text-[16px] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          ↗ {dict.cta}
        </a>
      )}
    </section>
  );
}
