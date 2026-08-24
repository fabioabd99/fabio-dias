import ContactForm from "./ContactForm";
import { site } from "@/lib/data/site";

interface ContactDict {
  label: string;
  title: string;
  titleAccent: string;
  direct: string;
  form: {
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    rateLimit: string;
  };
}

interface Props {
  dict: ContactDict;
}

export default function Contact({ dict }: Props) {
  return (
    <section
      id="contact"
      className="bg-ink text-bg px-8 py-25 border-t border-ink max-md:px-5 max-md:py-15"
    >
      {/* section-label mas com cor adaptada ao fundo escuro */}
      <div
        className="section-label"
        style={{ color: "rgba(244,241,234,0.5)" }}
      >
        {dict.label}
      </div>

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

      {/* Form à esquerda, info à direita — igual ao design */}
      <div className="grid grid-cols-2 gap-15 max-md:grid-cols-1 max-md:gap-10">

        {/* Coluna esquerda: formulário */}
        <ContactForm dict={dict.form} />

        {/* Coluna direita: email grande + lista de links */}
        <div>
          <h3
            className="text-[14px] uppercase tracking-wider mb-6 opacity-60"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {dict.direct}
          </h3>

          {/* Email em destaque — grande, clicável */}
          <a
            href={`mailto:${site.email}`}
            className="block leading-none mb-8 transition-colors duration-200 hover:text-accent"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              wordBreak: "break-all",
            }}
          >
            {site.email}
          </a>

          {/* Lista de links sociais */}
          <ul className="list-none flex flex-col gap-2.5">
            {/* O texto visível é derivado do próprio href — antes estavam
                escritos à mão e o do GitHub mostrava um utilizador que não era
                o do link. Assim não podem voltar a divergir. */}
            {[
              { label: "GitHub", href: site.github },
              { label: "LinkedIn", href: site.linkedin },
            ].map((l) => ({ ...l, display: l.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") })).map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 opacity-70 transition-all duration-200 hover:opacity-100 hover:text-accent"
                  style={{ fontFamily: "var(--font-jetbrains)", fontSize: "14px" }}
                >
                  <span aria-hidden="true">→</span>
                  {l.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
