import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n/dictionaries";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: "Fábio Dias — Web Developer",
    description: dict.about.p1.replace(/<[^>]+>/g, ""),
  };
}
import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Marquee from "./_components/Marquee";
import Stack from "./_components/Stack";
import ProjectsGrid from "./_components/ProjectsGrid";
import Experience from "./_components/Experience";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main id="top">
        <Hero dict={dict.hero} />
        <Marquee />
        <About dict={dict.about} />
        <Stack dict={dict.stack} />
        <ProjectsGrid dict={dict.work} lang={lang} />
        <Experience dict={dict.experience} lang={lang} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
