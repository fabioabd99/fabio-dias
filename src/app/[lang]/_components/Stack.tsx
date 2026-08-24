// Espelha a lista de competências do CV, pela mesma ordem
const techs = [
  { name: "JavaScript", cat: "Language" },
  { name: "TypeScript", cat: "Language" },
  { name: "React", cat: "Frontend" },
  { name: "Next.js", cat: "Framework" },
  { name: "HTML5", cat: "Web" },
  { name: "CSS3", cat: "Web" },
  { name: "Sass", cat: "Styling" },
  { name: "Tailwind", cat: "Styling" },
  { name: "Node.js", cat: "Backend" },
  { name: "PHP", cat: "Backend" },
  { name: "MySQL", cat: "Database" },
  { name: "PostgreSQL", cat: "Database" },
  { name: "Drupal", cat: "CMS" },
  { name: "WordPress", cat: "CMS" },
  { name: "Git", cat: "Tooling" },
  { name: "Docker", cat: "DevOps" },
  { name: "Vercel", cat: "DevOps" },
  { name: "npm", cat: "Tooling" },
  { name: "Composer", cat: "Tooling" },
  { name: "Figma", cat: "Design" },
];

interface StackDict {
  label: string;
  title: string;
  titleAccent: string;
}

interface Props {
  dict: StackDict;
}

import InView from "./InView";

export default function Stack({ dict }: Props) {
  return (
    <section
      id="stack"
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

      <InView delay={0.15}>
      {/* Só topo/esquerda: cada célula fecha-se à direita e em baixo, senão
          as bordas duplicavam e a última fila incompleta deixava uma linha solta */}
      <div className="grid border-t-[1.5px] border-l-[1.5px] border-ink grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {techs.map((tech, i) => (
          <div
            key={tech.name}
            className="border-r-[1.5px] border-b-[1.5px] border-ink px-6 py-7 transition-colors duration-250 hover:bg-accent hover:text-bg cursor-default"
          >
            <div
              className="text-[11px] opacity-60"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div
              className="text-[22px] mt-2 leading-none"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              {tech.name}
            </div>
            <div
              className="text-[11px] mt-3 uppercase opacity-60"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {tech.cat}
            </div>
          </div>
        ))}
      </div>
      </InView>
    </section>
  );
}
