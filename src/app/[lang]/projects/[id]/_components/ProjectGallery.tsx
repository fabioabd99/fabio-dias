import Image from "next/image";
import type { GalleryShot } from "@/lib/data/projects";

interface Dict {
  label: string;
  t1: string;
  t2: string;
}

interface Props {
  dict: Dict;
  gallery?: readonly GalleryShot[];
  deviceDesktop?: string;
  deviceMobile?: string;
}

// Layout fixo dos 7 slots. A ordem aqui tem de bater certo com o array gallery em projects.ts.
const SHOTS = [
  { span: 4, ratio: "16/9",  variant: "dark"   as const },
  { span: 2, ratio: "8/9",   variant: "dark"   as const },
  { span: 2, ratio: "4/5",   variant: "accent" as const },
  { span: 4, ratio: "16/10", variant: "dark"   as const },
  { span: 3, ratio: "4/3",   variant: "dark"   as const },
  { span: 3, ratio: "4/3",   variant: "light"  as const },
  { span: 6, ratio: "21/9",  variant: "dark"   as const },
];

// Galeria assimétrica 6-col com 7 shots — layout idêntico ao design HTML.
// Os shots são placeholders por agora (sem imagens reais).
// Quando tiveres screenshots, substitui o <div> de cada shot por <Image />.
export default function ProjectGallery({ dict, gallery, deviceDesktop, deviceMobile }: Props) {
  // Mantidos no escopo para o bloco JSX comentado abaixo (device frames).
  void deviceDesktop;
  void deviceMobile;
  return (
    <section className="py-25 border-b-[1.5px] border-ink max-md:py-15">
      {/* Label e título com padding horizontal normal */}
      <div className="px-8 max-md:px-5">
        <div className="section-label">{dict.label}</div>
        <h2
          className="uppercase mb-8"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: "clamp(36px, 7vw, 80px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {dict.t1} <em className="text-accent italic">{dict.t2}</em>
        </h2>
      </div>

      {/* Mosaico assimétrico — 6 colunas em desktop, 1 coluna em mobile */}
      <div className="grid grid-cols-1 md:grid-cols-6 mt-8 border-t-[1.5px] border-ink">
        {SHOTS.map((shot, i) => {
          const item = gallery?.[i];
          return (
            <Shot
              key={i}
              span={shot.span as 2 | 3 | 4 | 6}
              ratio={shot.ratio}
              variant={shot.variant}
              src={item?.src}
              label={item?.label ?? ""}
            />
          );
        })}
      </div>

      {/* Device frames desativados por agora — descomenta quando tiveres mockups */}
      {/* <div className="grid grid-cols-[2fr_1fr] gap-8 px-8 mt-15 items-end max-md:grid-cols-1 max-md:px-5 max-md:gap-5">
        <DeviceFrame type="desktop" src={deviceDesktop} />
        <DeviceFrame type="mobile" src={deviceMobile} />
      </div> */}
    </section>
  );
}

// ─── Shot placeholder ─────────────────────────────────────────────────────────

// Mapa estático para Tailwind incluir as classes no bundle (não pode ser dinâmico)
const SPAN_CLS: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
};

function Shot({
  cls,
  label,
  span,
  ratio,
  variant,
  src,
}: {
  cls?: string;
  label: string;
  span: 2 | 3 | 4 | 6;
  ratio: string;
  variant: "dark" | "accent" | "light";
  src?: string;
}) {
  const accent = variant === "accent";
  const light = variant === "light";
  const bg = accent ? "bg-accent text-ink" : light ? "bg-bg text-ink" : "bg-ink text-bg";
  const borderDashed = accent
    ? "border-dashed border-[rgba(0,0,0,0.4)]"
    : light
    ? "border-dashed border-[rgba(0,0,0,0.3)]"
    : "border-dashed border-[rgba(255,91,34,0.4)]";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink transition-colors duration-300 col-span-1 ${SPAN_CLS[span]}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // Imagem emoldurada — fica DENTRO da borda tracejada (matte editorial),
        // não preenche a célula toda. A moldura mantém o look do placeholder.
        <>
          {/* Matte: fundo da variant + linhas diagonais */}
          <div
            className={`absolute inset-0 ${bg}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)",
            }}
          />
          {/* Borda tracejada como moldura */}
          <div className={`absolute inset-3 border-2 ${borderDashed}`} />
          {/* Imagem dentro da moldura, com pequeno padding adicional */}
          <div className="absolute inset-5 overflow-hidden">
            <Image
              src={src}
              alt={label}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
            />
          </div>
        </>
      ) : (
        <>
          {/* Placeholder: fundo com linhas diagonais + borda tracejada + label */}
          <div
            className={`absolute inset-0 ${bg}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)",
            }}
          />
          <div className={`absolute inset-3 border-2 ${borderDashed} transition-all duration-300`} />
          <span
            className={`relative z-10 px-4 py-2.5 border-2 ${accent || light ? "border-ink" : "border-bg"} ${bg} text-[11px] uppercase tracking-[0.08em]`}
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            {label}
          </span>
        </>
      )}
    </div>
  );
}

// ─── Device frame ─────────────────────────────────────────────────────────────
// Mantido para reativação futura — JSX que o invoca está comentado acima.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DeviceFrame({ type, src }: { type: "desktop" | "mobile"; src?: string }) {
  const isDesktop = type === "desktop";

  return (
    <div
      className="border-[1.5px] border-ink bg-white transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--color-accent)]"
    >
      {/* Barra superior do browser/dispositivo */}
      <div
        className="bg-ink text-bg flex items-center gap-2 px-3.5 py-2.5"
        style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px" }}
      >
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <i key={i} className="block w-2 h-2 rounded-full bg-bg opacity-40" />
          ))}
        </span>
        <span className="opacity-60 ml-1">
          {isDesktop ? "fabio.dev/project" : "m"}
        </span>
      </div>

      {/* Frame do conteúdo */}
      <div
        className={`relative flex items-center justify-center overflow-hidden ${isDesktop ? "bg-ink text-bg" : "bg-accent text-ink"}`}
        style={{ aspectRatio: isDesktop ? "16/10" : "9/16" }}
      >
        {src ? (
          <>
            <Image
              src={src}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scale-110 blur-2xl opacity-60"
            />
            <Image
              src={src}
              alt={isDesktop ? "Desktop screenshot" : "Mobile screenshot"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain relative"
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,91,34,0.06) 0 10px, transparent 10px 20px)",
              }}
            />
            <span
              className={`relative z-10 px-3.5 py-2.5 border-2 ${isDesktop ? "border-bg" : "border-ink"} text-[11px] uppercase tracking-[0.08em]`}
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {isDesktop ? "DESKTOP MOCKUP" : "MOBILE"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
