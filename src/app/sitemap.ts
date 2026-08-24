import type { MetadataRoute } from "next";
import { getAllProjects, CONTENT_UPDATED } from "@/lib/data/projects";
import { SITE_URL } from "@/lib/data/site";

const LOCALES = ["pt", "en"] as const;

// PT é o destino de quem não corresponde a nenhum locale — é o que o proxy.ts
// já faz por omissão. O x-default torna essa decisão legível para os crawlers.
const DEFAULT_LOCALE = "pt";

// Data fixa em vez de new Date(): o sitemap é gerado no build, portanto
// new Date() marcava TODAS as páginas como alteradas a cada deploy, mesmo sem
// mudança de conteúdo. Um <lastmod> que muda sempre é um sinal que o Google
// aprende a ignorar.
const lastModified = new Date(CONTENT_UPDATED);

function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries = LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: alternates(""),
  }));

  const projectEntries = getAllProjects().flatMap((p) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      alternates: alternates(`/projects/${p.slug}`),
    }))
  );

  return [...homeEntries, ...projectEntries];
}
