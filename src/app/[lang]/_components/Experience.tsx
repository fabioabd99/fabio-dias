import { getTimeline } from "@/lib/data/experience";
import type { Locale } from "@/lib/i18n/dictionaries";
import InView from "./InView";

interface ExperienceDict {
  label: string;
  title: string;
  titleAccent: string;
  now: string;
}

interface Props {
  dict: ExperienceDict;
  lang: Locale;
}

export default function Experience({ dict, lang }: Props) {
  const items = getTimeline();

  return (
    <section
      id="experience"
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

      <ol className="list-none">
        {items.map((item, i) => {
          const c = item[lang];
          return (
            <InView
              key={item.id}
              delay={i * 0.1}
              as="li"
              className={`grid grid-cols-[220px_1fr] gap-10 py-8 border-b-[1.5px] border-ink max-md:grid-cols-1 max-md:gap-3
                ${i === 0 ? "border-t-[1.5px] border-ink" : ""}`}
            >
              {/* Período — com badge "AGORA/NOW" se for o cargo atual */}
              <div
                className="text-[13px] uppercase pt-0.5"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {item.period}
                {item.now && (
                  <span className="ml-2 inline-block bg-accent text-bg px-2 py-0.5 text-[11px]">
                    {dict.now}
                  </span>
                )}
              </div>

              {/* Conteúdo */}
              <div>
                <h3
                  className="text-[24px] leading-[1.1] mb-1"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {c.title}
                </h3>
                <div className="text-[15px] opacity-70 mb-3">{c.company}</div>
                <p className="text-[16px] leading-[1.6] max-w-150">{c.desc}</p>
              </div>
            </InView>
          );
        })}
      </ol>
    </section>
  );
}
