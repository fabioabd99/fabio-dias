import Link from "next/link";
import type { ProjectData } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/dictionaries";

interface Dict {
  prev: string;
  next: string;
}

interface Props {
  prev: ProjectData | undefined;
  next: ProjectData | undefined;
  lang: Locale;
  dict: Dict;
}

export default function ProjectPrevNext({ prev, next, lang, dict }: Props) {
  // Se não há anterior ou próximo (primeiro/último projeto) redireciona para a home
  const prevHref = prev ? `/${lang}/projects/${prev.slug}` : `/${lang}#work`;
  const nextHref = next ? `/${lang}/projects/${next.slug}` : `/${lang}#work`;
  const prevName = prev ? `${prev.title} ${prev.titleAccent}` : "—";
  const nextName = next ? `${next.title} ${next.titleAccent}` : "—";

  return (
    <nav
      className="grid grid-cols-2 border-b-[1.5px] border-ink"
      aria-label="Navegação entre projetos"
    >
      <Link
        href={prevHref}
        className="flex flex-col gap-2 px-8 py-15 border-r-[1.5px] border-ink transition-colors duration-250 hover:bg-ink hover:text-bg max-md:px-5 max-md:py-8"
      >
        <span
          className="text-[12px] uppercase tracking-[0.08em] opacity-60"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          ← {dict.prev}
        </span>
        <span
          className="uppercase leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: "clamp(24px, 4vw, 40px)",
          }}
        >
          {prevName}
        </span>
      </Link>

      <Link
        href={nextHref}
        className="flex flex-col gap-2 px-8 py-15 text-right transition-colors duration-250 hover:bg-ink hover:text-bg max-md:px-5 max-md:py-8"
      >
        <span
          className="text-[12px] uppercase tracking-[0.08em] opacity-60"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {dict.next} →
        </span>
        <span
          className="uppercase leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: "clamp(24px, 4vw, 40px)",
          }}
        >
          {nextName}
        </span>
      </Link>
    </nav>
  );
}
