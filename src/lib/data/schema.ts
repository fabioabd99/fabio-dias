import { SITE_URL, site } from "./site";
import type { ProjectData } from "./projects";
import type { Locale } from "@/lib/i18n/dictionaries";

// JSON-LD para o Google perceber que o site descreve uma pessoa concreta e que
// cada página de projeto é um trabalho dessa pessoa. É o que alimenta o painel
// de conhecimento quando alguém pesquisa pelo nome.
//
// Fica em módulo próprio para o schema ser dados e não JSX espalhado pelas
// páginas — e para os dois esquemas partilharem o mesmo @id de Person.

const PERSON_ID = `${SITE_URL}/#person`;

export function personSchema(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: `${SITE_URL}/${lang}`,
    email: `mailto:${site.email}`,
    jobTitle: lang === "pt" ? "Web Developer Full-Stack" : "Full-Stack Web Developer",
    description,
    // sameAs é como o Google liga esta página aos perfis e confirma a identidade.
    sameAs: [site.github, site.linkedin],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PHP",
      "MySQL",
      "PostgreSQL",
      "Drupal",
      "WordPress",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Oliveira do Hospital",
      addressCountry: "PT",
    },
  };
}

export function websiteSchema(lang: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${lang}`,
    name: site.name,
    description,
    inLanguage: lang === "pt" ? "pt-PT" : "en-GB",
    author: { "@id": PERSON_ID },
  };
}

export function projectSchema(
  project: ProjectData,
  lang: Locale,
  updated: string
) {
  const content = project[lang];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.title}${project.titleAccent}`,
    headline: content.sub.replace(/<[^>]+>/g, ""),
    description: content.desc,
    url: `${SITE_URL}/${lang}/projects/${project.slug}`,
    inLanguage: lang === "pt" ? "pt-PT" : "en-GB",
    dateCreated: project.year,
    dateModified: updated,
    keywords: project.chips.join(", "),
    // O mesmo @id da Person do layout — liga o projeto ao autor sem repetir os dados.
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}
