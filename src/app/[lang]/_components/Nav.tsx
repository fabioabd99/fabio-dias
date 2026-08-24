"use client";

import LanguageToggle from "./LanguageToggle";
import type { Locale } from "@/lib/i18n/dictionaries";
import { useScrolled } from "@/lib/hooks/useScrolled";

interface NavDict {
  about: string;
  stack: string;
  work: string;
  contact: string;
}

interface Props {
  dict: NavDict;
  lang: Locale;
}

export default function Nav({ dict, lang }: Props) {
  const scrolled = useScrolled();

  return (
    // Só o fundo e a borda mudam com o scroll: o texto mantém sempre a mesma
    // cor. A borda existe desde o início em transparente para poder animar
    // junto com o fundo, em vez de aparecer de repente e empurrar o layout.
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b-[1.5px] transition-colors duration-300 ${
        scrolled ? "bg-bg border-ink" : "bg-transparent border-transparent"
      }`}
    >
      {/* Logo */}
      <a
        href={`/${lang}`}
        className="nav-link text-[22px] tracking-tight"
        style={{ fontFamily: "var(--font-archivo)", letterSpacing: "-0.02em" }}
        aria-label="Fábio Dias — Home"
      >
        FD//
      </a>

      {/* Links — escondidos em mobile */}
      {/* font-bold e não semibold: o Space Grotesk só carrega 400/500/700,
          o 600 seria sintetizado pelo browser e sairia sujo */}
      <ul className="hidden md:flex items-center gap-7 list-none text-[15px] font-bold">
        <li><a href="#about" className="nav-link">{dict.about}</a></li>
        <li><a href="#stack" className="nav-link">{dict.stack}</a></li>
        <li><a href="#work" className="nav-link">{dict.work}</a></li>
        <li><a href="#contact" className="nav-link">{dict.contact}</a></li>
      </ul>

      {/* Language toggle */}
      <LanguageToggle lang={lang} />

    </nav>
  );
}
