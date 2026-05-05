import { notFound } from "next/navigation";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { hasLocale } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";
import SmoothScroll from "./_components/SmoothScroll";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fabio-dias.dev";

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

  const isPt = lang === "pt";
  const description = isPt
    ? "Web Developer full-stack com 3+ anos de experiência em PHP, React e Next.js. Disponível para projetos remotos."
    : "Full-stack Web Developer with 3+ years of experience in PHP, React and Next.js. Available for remote projects.";

  return {
    title: {
      default: "Fábio Dias — Web Developer",
      template: "%s | Fábio Dias",
    },
    description,
    authors: [{ name: "Fábio Dias" }],
    openGraph: {
      type: "website",
      locale: isPt ? "pt_PT" : "en_GB",
      alternateLocale: isPt ? ["en_GB"] : ["pt_PT"],
      url: `${SITE_URL}/${lang}`,
      siteName: "Fábio Dias",
      title: "Fábio Dias — Web Developer",
      description,
    },
    twitter: {
      card: "summary",
      title: "Fábio Dias — Web Developer",
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        pt: `${SITE_URL}/pt`,
        en: `${SITE_URL}/en`,
      },
    },
    robots: { index: true, follow: true },
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

  return (
    <html
      lang={lang as Locale}
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
