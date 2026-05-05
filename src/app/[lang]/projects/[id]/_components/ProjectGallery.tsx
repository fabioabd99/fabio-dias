interface Dict {
  label: string;
  t1: string;
  t2: string;
}

interface Props {
  dict: Dict;
}

// Galeria assimétrica 6-col com 7 shots — layout idêntico ao design HTML.
// Os shots são placeholders por agora (sem imagens reais).
// Quando tiveres screenshots, substitui o <div> de cada shot por <Image />.
export default function ProjectGallery({ dict }: Props) {
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

      {/* Mosaico assimétrico — 6 colunas, 7 shots com spans diferentes */}
      <div
        className="grid mt-8 border-t-[1.5px] border-ink max-md:grid-cols-1"
        style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
      >
        <Shot cls="s1" label="HOME · LANDING"      span={4} ratio="16/9" />
        <Shot cls="s2" label="DETAIL VIEW"          span={2} ratio="8/9" />
        <Shot cls="s3" label="FEATURE HIGHLIGHT"    span={2} ratio="4/5"  accent />
        <Shot cls="s4" label="DASHBOARD"            span={4} ratio="16/10" />
        <Shot cls="s5" label="USER FLOW"            span={3} ratio="4/3" />
        <Shot cls="s6" label="EMPTY STATE"          span={3} ratio="4/3"  light />
        <Shot cls="s7" label="WIDE SHOT"            span={6} ratio="21/9" />
      </div>

      {/* Device frames: desktop + mobile side-by-side */}
      <div className="grid grid-cols-[2fr_1fr] gap-8 px-8 mt-15 items-end max-md:grid-cols-1 max-md:px-5 max-md:gap-5">
        <DeviceFrame type="desktop" />
        <DeviceFrame type="mobile" />
      </div>
    </section>
  );
}

// ─── Shot placeholder ─────────────────────────────────────────────────────────

function Shot({
  label,
  span,
  ratio,
  accent,
  light,
}: {
  label: string;
  span: number;
  ratio: string;
  accent?: boolean;
  light?: boolean;
}) {
  const bg = accent ? "bg-accent text-ink" : light ? "bg-bg text-ink" : "bg-ink text-bg";
  const borderDashed = accent
    ? "border-dashed border-[rgba(0,0,0,0.4)]"
    : light
    ? "border-dashed border-[rgba(0,0,0,0.3)]"
    : "border-dashed border-[rgba(255,91,34,0.4)]";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink transition-colors duration-300 max-md:col-span-1`}
      style={{
        gridColumn: `span ${span}`,
        aspectRatio: ratio,
      }}
    >
      {/* Fundo com linhas diagonais — replicado do design */}
      <div
        className={`absolute inset-0 ${bg}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)",
        }}
      />
      {/* Borda interna tracejada */}
      <div className={`absolute inset-3 border-2 ${borderDashed} transition-all duration-300`} />
      {/* Label */}
      <span
        className={`relative z-10 px-4 py-2.5 border-2 ${accent || light ? "border-ink" : "border-bg"} ${bg} text-[11px] uppercase tracking-[0.08em]`}
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Device frame ─────────────────────────────────────────────────────────────

function DeviceFrame({ type }: { type: "desktop" | "mobile" }) {
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
      </div>
    </div>
  );
}
