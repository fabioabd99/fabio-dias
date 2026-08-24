import { ImageResponse } from "next/og";
import { hasLocale, getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/data/site";
import { OG, OG_SIZE, ogFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Fábio Dias — Web Developer";

// O domínio sem protocolo, para a barra inferior.
const HOST = SITE_URL.replace(/^https?:\/\//, "");

// Sem isto a imagem seria gerada a cada pedido. Os ficheiros de imagem não
// herdam o generateStaticParams do layout — têm de declarar o seu.
export function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }];
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = hasLocale(lang) ? await getDictionary(lang) : null;
  const role = dict?.hero?.status ?? "WEB DEVELOPER";

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
        {/* Barra de meta, a ecoar a que abre as secções do site */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "34px 48px 0",
            fontSize: 20,
            letterSpacing: "0.16em",
          }}
        >
          <span style={{ color: OG.accent }}>FD//</span>
          <span style={{ opacity: 0.55 }}>{lang.toUpperCase()}</span>
        </div>

        {/* Nome — o mesmo corte do hero, com o ponto em acento */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 48px",
          }}
        >
          <div style={{ display: "flex", fontSize: 148, lineHeight: 1, letterSpacing: "-0.05em" }}>
            FÁBIO
          </div>
          <div style={{ display: "flex", fontSize: 148, lineHeight: 1, letterSpacing: "-0.05em" }}>
            DIAS
            <span style={{ color: OG.accent }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              letterSpacing: "0.1em",
              opacity: 0.7,
            }}
          >
            {role}
          </div>
        </div>

        {/* Rodapé invertido — o site usa este contraste no footer */}
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
          <span style={{ color: OG.accent }}>FULL-STACK</span>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() }
  );
}
