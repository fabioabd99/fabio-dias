"use client";

import { useRouter } from "next/navigation";

interface Props {
  lang: "pt" | "en";
  slug: string;
}

export default function ProjectLangToggle({ lang, slug }: Props) {
  const router = useRouter();

  function toggle() {
    const next = lang === "pt" ? "en" : "pt";
    document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    router.push(`/${next}/projects/${slug}`);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="fixed bottom-6 right-6 z-90 px-3.5 py-2.5 bg-ink text-bg border-[1.5px] border-ink uppercase tracking-[0.08em] transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-ink"
      style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px" }}
    >
      PT / EN
    </button>
  );
}
