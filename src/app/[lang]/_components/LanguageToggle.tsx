"use client";

import { useRouter } from "next/navigation";

interface Props {
  lang: "pt" | "en";
  path?: string; // e.g. "/projects/lorem-commerce" — appended after the locale
}

export default function LanguageToggle({ lang, path = "" }: Props) {
  const router = useRouter();

  function switchTo(next: "pt" | "en") {
    if (next === lang) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${next}${path}`);
  }

  return (
    <div
      className="flex items-center gap-1 border border-current rounded-full px-2.5 py-1"
      style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 500 }}
    >
      <button
        onClick={() => switchTo("pt")}
        className="px-1.5 py-0.5 transition-opacity duration-200"
        style={{ opacity: lang === "pt" ? 1 : 0.45 }}
        aria-label="Português"
        aria-pressed={lang === "pt"}
      >
        PT
      </button>
      <span style={{ opacity: 0.45 }}>/</span>
      <button
        onClick={() => switchTo("en")}
        className="px-1.5 py-0.5 transition-opacity duration-200"
        style={{ opacity: lang === "en" ? 1 : 0.45 }}
        aria-label="English"
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
