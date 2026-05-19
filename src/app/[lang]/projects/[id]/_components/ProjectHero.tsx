import type { ProjectData } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/dictionaries";

interface Dict {
  qf: { role: string; duration: string; type: string; repo: string };
}

interface Props {
  project: ProjectData;
  content: ProjectData["pt"];
  lang: Locale;
  dict: Dict;
}

export default function ProjectHero({ project, content, lang, dict }: Props) {
  const qfContent = project.qf[lang];

  return (
    <header
      className="px-8 pt-[140px] pb-[60px] border-b-[1.5px] border-ink max-md:px-5 max-md:pt-[120px] max-md:pb-10"
    >
      {/* Barra de meta: num/cat + ano */}
      <div
        className="flex justify-between flex-wrap gap-3 border-b-[1.5px] border-ink pb-3 text-[12px] uppercase tracking-[0.08em] text-muted"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        <span>
          <span className="text-accent">{project.num}</span> / {project.cat}
        </span>
        <span>{project.year}</span>
      </div>

      {/* Título grande: Lorem.Commerce */}
      <h1
        className="uppercase my-[50px] max-md:my-8 wrap-anywhere max-w-full"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "clamp(40px, 11vw, 180px)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
        }}
      >
        {project.title}
        <em className="text-accent not-italic">.</em>
        {project.titleAccent}
      </h1>

      {/* Subtítulo */}
      <p
        className="text-[clamp(20px,2.4vw,28px)] max-w-[720px] leading-[1.4]"
        dangerouslySetInnerHTML={{ __html: content.sub }}
      />

      {/* Quickfacts: 4 células em grelha com bordas */}
      <div
        className="grid grid-cols-4 mt-[60px] border-t-[1.5px] border-l-[1.5px] border-ink max-md:grid-cols-2"
      >
        {[
          { k: dict.qf.role,     v: project.qf.role },
          { k: dict.qf.duration, v: qfContent.duration },
          { k: dict.qf.type,     v: qfContent.type },
          { k: dict.qf.repo,     v: project.repo },
        ].map(({ k, v }) => (
          <div
            key={k}
            className="border-r-[1.5px] border-b-[1.5px] border-ink px-6 py-6 transition-colors duration-250 hover:bg-ink hover:text-bg"
          >
            <div
              className="text-[11px] uppercase tracking-[0.08em] opacity-60 mb-2"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {k}
            </div>
            <div
              className="text-[18px] leading-[1.1] wrap-anywhere max-md:text-[16px]"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
