import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/lib/i18n/dictionaries";
import { getAllProjects, getProject, getAdjacentProjects } from "@/lib/data/projects";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id: slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(slug);
  if (!project) return {};
  const c = project[lang];
  const title = `${project.title} ${project.titleAccent}`;
  return {
    title,
    description: c.desc,
    openGraph: {
      title: `${title} | Fábio Dias`,
      description: c.desc,
    },
  };
}
import ProjectNav from "./_components/ProjectNav";
import ProjectHero from "./_components/ProjectHero";
import ProjectAbout from "./_components/ProjectAbout";
import ProjectGallery from "./_components/ProjectGallery";
import ProjectBand from "./_components/ProjectBand";
import ProjectBuild from "./_components/ProjectBuild";
import ProjectStack from "./_components/ProjectStack";
import ProjectResults from "./_components/ProjectResults";
import ProjectPrevNext from "./_components/ProjectPrevNext";
import ProjectLangToggle from "./_components/ProjectLangToggle";
import Footer from "../../_components/Footer";

// Gera as 10 rotas estáticas (2 idiomas × 5 projetos) em build time.
// O Next.js não renderiza mais nada em runtime para estas rotas.
export async function generateStaticParams() {
  const projects = getAllProjects();
  return ["pt", "en"].flatMap((lang) =>
    projects.map((p) => ({ lang, id: p.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id: slug } = await params;
  if (!hasLocale(lang)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const dict = await getDictionary(lang);
  const d = dict.project;
  const c = project[lang];
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <ProjectNav lang={lang} backLabel={d.back} />
      <ProjectLangToggle lang={lang as "pt" | "en"} slug={slug} />
      <main>
        <ProjectHero project={project} content={c} lang={lang} dict={d} />
        <ProjectAbout content={c} dict={d.about} />
        <ProjectGallery dict={d.gallery} />
        <ProjectBand />
        <ProjectBuild content={c} dict={d.build} />
        <ProjectStack project={project} dict={d.stack} />
        <ProjectResults project={project} dict={d.highlights} />
        <ProjectPrevNext prev={prev} next={next} lang={lang} dict={d.nav} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
