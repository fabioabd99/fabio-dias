interface AboutDict {
  label: string;
  title: string;
  titleAccent: string;
  p1: string;
  p2: string;
  p3: string;
  cv: string;
  facts: string;
  fact1: string;
  fact2: string;
  fact3: string;
  fact4: string;
  fact5: string;
  available: string;
  factValues: {
    location: string;
    experience: string;
    projects: string;
    focus: string;
  };
}

interface Props {
  dict: AboutDict;
  lang: Locale;
}

import InView from "./InView";
import { site } from "@/lib/data/site";
import type { Locale } from "@/lib/i18n/dictionaries";

export default function About({ dict, lang }: Props) {
  return (
    <section
      id="about"
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

      <div className="grid grid-cols-[1.4fr_1fr] gap-15 items-start max-md:grid-cols-1 max-md:gap-10">
        <InView delay={0.15} className="about-text text-[22px] leading-normal max-w-145 max-md:text-[18px]">
          <p dangerouslySetInnerHTML={{ __html: dict.p1 }} />
          <p className="mt-[18px]">{dict.p2}</p>
          <p className="mt-[18px]" dangerouslySetInnerHTML={{ __html: dict.p3 }} />
          <a
            href={site.cv[lang]}
            download={`Fabio-Dias-CV-${lang.toUpperCase()}.pdf`}
            className="inline-flex items-center gap-3 border-[1.5px] border-ink px-5.5 py-3.5 mt-6 text-[14px] uppercase tracking-wider transition-colors duration-250 hover:bg-ink hover:text-bg"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {dict.cv}
          </a>
        </InView>

        {/* Card de factos */}
        <InView delay={0.25} className="border-[1.5px] border-ink p-6 bg-bg shadow-[8px_8px_0_var(--color-ink)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_var(--color-ink)]">
          <h3
            className="text-[14px] uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {dict.facts}
          </h3>
          <ul className="text-[13px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {[
              { label: dict.fact1, value: dict.factValues.location },
              { label: dict.fact2, value: dict.factValues.experience },
              { label: dict.fact3, value: dict.factValues.projects },
              { label: dict.fact4, value: dict.factValues.focus },
            ].map(({ label, value }) => (
              <li
                key={label}
                className="flex justify-between py-2 border-b border-dashed border-ink"
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
            <li className="flex justify-between py-2">
              <span>{dict.fact5}</span>
              <strong className="text-accent">{dict.available}</strong>
            </li>
          </ul>
        </InView>
      </div>
    </section>
  );
}
