import { notFound } from "next/navigation";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { hasLocale, getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import SmoothScroll from "./_components/SmoothScroll";
import { SITE_URL, site } from "@/lib/data/site";
import { personSchema, websiteSchema } from "@/lib/data/schema";
import "../globals.css";

// Os nomes das variáveis aqui (--font-archivo, etc.) são DIFERENTES
// dos nomes Tailwind (--font-display, etc.) para evitar referência circular no CSS
const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  // Vem do dicionário e não de literais aqui: antes dizia "3+ anos" enquanto o
  // corpo do site já dizia "5+", porque eram dois sítios a manter em sincronia.
  const { title, description } = dict.meta;
  const isPt = lang === "pt";

  return {
    // Sem isto, qualquer campo de metadados com caminho relativo — como a
    // imagem OG — rebenta o build.
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Fábio Dias",
    },
    description,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: isPt ? "pt_PT" : "en_GB",
      alternateLocale: isPt ? ["en_GB"] : ["pt_PT"],
      url: `${SITE_URL}/${lang}`,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        pt: `${SITE_URL}/pt`,
        en: `${SITE_URL}/en`,
        // Quem não é PT nem EN cai no PT, tal como o proxy.ts já decide.
        "x-default": `${SITE_URL}/pt`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  // Person + WebSite num só grafo. O JSON.stringify escapa o conteúdo, e os
  // dados vêm todos de constantes do projeto — nunca de input externo.
  const schema = [
    personSchema(lang, dict.meta.description),
    websiteSchema(lang, dict.meta.description),
  ];

  return (
    <html
      lang={lang as Locale}
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
