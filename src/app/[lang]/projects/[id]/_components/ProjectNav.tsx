"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n/dictionaries";
import { useScrolled } from "@/lib/hooks/useScrolled";

interface Props {
  lang: Locale;
  backLabel: string;
}

// Nav simplificado da página de projeto: só logo + botão voltar em pill.
// Ver useScrolled para o porquê da troca para fundo sólido.
export default function ProjectNav({ lang, backLabel }: Props) {
  const scrolled = useScrolled();

  return (
    // Só o fundo e a borda mudam com o scroll: o texto mantém sempre a mesma
    // cor. A borda existe desde o início em transparente para poder animar
    // junto com o fundo, em vez de aparecer de repente.
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 max-md:px-5 border-b-[1.5px] transition-colors duration-300 ${
        scrolled ? "bg-bg border-ink" : "bg-transparent border-transparent"
      }`}
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
        className="inline-flex items-center gap-2 border-[1.5px] border-current px-3.5 py-2 rounded-full text-[13px] uppercase tracking-[0.08em] transition-colors duration-200 hover:bg-ink hover:text-bg max-md:text-[12px] max-md:px-3 max-md:py-1.5"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        ← {backLabel}
      </Link>
    </nav>
  );
}
