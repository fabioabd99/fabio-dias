import { getAllProjects } from "@/lib/data/projects";
import type { Locale } from "@/lib/i18n/dictionaries";
import ProjectCard from "./ProjectCard";
import InView from "./InView";

interface WorkDict {
  label: string;
  title: string;
  titleAccent: string;
  view: string;
}

interface Props {
  dict: WorkDict;
  lang: Locale;
}

export default function ProjectsGrid({ dict, lang }: Props) {
  const projects = getAllProjects();

  return (
    <section
      id="work"
      className="px-8 py-25 border-t border-ink max-md:px-5 max-md:py-15"
    >
      <InView><div className="section-label">{dict.label}</div></InView>

      <InView delay={0.1}>
        <h2
          className="uppercase mb-15 max-md:mb-10"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: "clamp(40px, 8vw, 96px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {dict.title} <em className="text-accent italic">{dict.titleAccent}</em>
        </h2>
      </InView>

      {/* Lista de projetos — cada card com stagger */}
      <ol className="list-none">
        {projects.map((p, i) => (
          <InView key={p.id} delay={i * 0.08} as="li">
            <ProjectCard project={p} lang={lang} isFirst={i === 0} />
          </InView>
        ))}
      </ol>
    </section>
  );
}
