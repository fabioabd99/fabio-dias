import LanguageToggle from "./LanguageToggle";
import type { Locale } from "@/lib/i18n/dictionaries";

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
  return (
    // mix-blend-mode: difference faz o nav aparecer sempre branco por cima
    // do conteúdo, independentemente da cor de fundo da secção
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ mixBlendMode: "difference", color: "#fff" }}
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
      <ul className="hidden md:flex items-center gap-7 list-none text-[15px] font-medium">
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
