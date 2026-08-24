import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n/dictionaries";

// Sem generateMetadata: o título e a descrição da home são exatamente os do
// layout. Repeti-los aqui só criava um segundo sítio para ficarem dessincronizados
// — foi assim que a descrição encalhou nos "3+ anos".
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
        <About dict={dict.about} lang={lang} />
        <Stack dict={dict.stack} />
        <ProjectsGrid dict={dict.work} lang={lang} />
        <Experience dict={dict.experience} lang={lang} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
