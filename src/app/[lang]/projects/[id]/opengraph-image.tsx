import { ImageResponse } from "next/og";
import { hasLocale } from "@/lib/i18n/dictionaries";
import { getAllProjects, getProject } from "@/lib/data/projects";
import { SITE_URL, site } from "@/lib/data/site";
import { OG, OG_SIZE, ogFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Projeto — Fábio Dias";

const HOST = SITE_URL.replace(/^https?:\/\//, "");

// Pré-gera as 4 imagens (2 idiomas × 2 projetos) no build, em vez de as
// construir a cada pedido de um crawler.
export function generateStaticParams() {
  return getAllProjects().flatMap((p) =>
    ["pt", "en"].map((lang) => ({ lang, id: p.slug }))
  );
}

// Corta a descrição para não transbordar do cartão. O Satori não faz reticências
// automáticas, portanto o corte tem de ser nosso.
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id: slug } = await params;
  const project = getProject(slug);

  // Rota inválida ainda tem de devolver uma imagem — um cartão vazio é melhor
  // do que uma exceção durante o build.
  if (!project || !hasLocale(lang)) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: OG.ink,
            color: OG.bg,
            fontSize: 72,
            letterSpacing: "-0.04em",
          }}
        >
          {site.name}
        </div>
      ),
      { ...size, fonts: ogFonts() }
    );
  }

  const content = project[lang];
  const title = `${project.title}${project.titleAccent}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: OG.bg,
          color: OG.ink,
          border: `12px solid ${OG.ink}`,
        }}
      >
        {/* Numeração e categoria — a mesma barra que abre a página do projeto */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "34px 48px 26px",
            borderBottom: `3px solid ${OG.ink}`,
            fontSize: 20,
            letterSpacing: "0.14em",
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: OG.accent }}>{project.num}</span>
            <span style={{ opacity: 0.6 }}>&nbsp;/&nbsp;{project.cat.toUpperCase()}</span>
          </div>
          <span style={{ opacity: 0.6 }}>{project.year}</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 132, lineHeight: 1, letterSpacing: "-0.05em" }}>
            {title}
            <span style={{ color: OG.accent }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 27,
              lineHeight: 1.4,
              opacity: 0.72,
              maxWidth: 900,
            }}
          >
            {clamp(content.desc, 130)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: OG.ink,
            color: OG.bg,
            padding: "22px 48px",
            fontSize: 20,
            letterSpacing: "0.12em",
          }}
        >
          <span>{HOST}</span>
          <span style={{ color: OG.accent }}>{site.name.toUpperCase()}</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}
