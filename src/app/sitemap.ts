import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fabio-dias.dev";
const LOCALES = ["pt", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = getAllProjects().flatMap((p) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}/projects/${p.slug}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/projects/${p.slug}`])
        ),
      },
    }))
  );

  const homeEntries = LOCALES.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  }));

  return [...homeEntries, ...projectEntries];
}
