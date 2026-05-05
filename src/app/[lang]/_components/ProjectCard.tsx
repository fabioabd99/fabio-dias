import Link from "next/link";
import type { ProjectData } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/dictionaries";

interface Props {
  project: ProjectData;
  lang: Locale;
  isFirst: boolean;
}

// Cada projeto é uma linha full-width: número | nome + stack | seta
// No hover a linha fica escura (bg-ink, text-bg) com deslize para a direita
export default function ProjectCard({ project, lang, isFirst }: Props) {
  const chips = project.chips.join(" · ");

  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      aria-label={`${project.title} ${project.titleAccent}`}
      className={`group grid grid-cols-[80px_1fr_auto] items-center gap-8 py-10 pr-10 border-b-[1.5px] border-ink transition-all duration-300
        hover:pl-6 hover:bg-ink hover:text-bg
        max-md:grid-cols-[auto_1fr] max-md:gap-4 max-md:py-6 max-md:pr-0
        ${isFirst ? "border-t-[1.5px] border-ink" : ""}`}
    >
      {/* Número */}
      <span
        className="text-[14px]"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        {project.num}
      </span>

      {/* Título + stack */}
      <div>
        <h3
          className="uppercase leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.02em",
          }}
        >
          {project.title}{" "}
          <em className="text-accent italic">{project.titleAccent}</em>
        </h3>
        <div
          className="text-[12px] mt-2 opacity-70 transition-opacity group-hover:opacity-100"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {chips}
        </div>
      </div>

      {/* Seta — esconde em mobile */}
      <span
        aria-hidden="true"
        className="text-[32px] transition-transform duration-300 group-hover:translate-x-2 max-md:hidden"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        →
      </span>
    </Link>
  );
}
