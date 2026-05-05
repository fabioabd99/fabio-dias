import Link from "next/link";
import type { Locale } from "@/lib/i18n/dictionaries";

interface Props {
  lang: Locale;
  backLabel: string;
}

// Nav simplificado da página de projeto: só logo + botão voltar em pill.
// Mantém mix-blend-mode: difference igual ao nav da home.
export default function ProjectNav({ lang, backLabel }: Props) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-md:px-5"
      style={{ mixBlendMode: "difference", color: "#fff" }}
    >
      <Link
        href={`/${lang}`}
        className="text-[22px] tracking-tight"
        style={{ fontFamily: "var(--font-archivo)", letterSpacing: "-0.02em" }}
        aria-label="Fábio Dias — Home"
      >
        FD//
      </Link>

      <Link
        href={`/${lang}#work`}
        className="inline-flex items-center gap-2 border-[1.5px] border-current px-3.5 py-2 rounded-full text-[13px] uppercase tracking-[0.08em] transition-all duration-200 hover:bg-current hover:text-ink"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        ← {backLabel}
      </Link>
    </nav>
  );
}
