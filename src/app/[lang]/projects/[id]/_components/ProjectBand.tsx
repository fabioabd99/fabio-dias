// Banda full-bleed entre secções — fundo escuro com linhas diagonais.
// Placeholder até ter um screenshot real do projeto.
export default function ProjectBand() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden bg-ink text-bg border-b-[1.5px] border-ink"
      style={{ aspectRatio: "21/9" }}
      aria-hidden="true"
    >
      {/* Linhas diagonais de fundo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,91,34,0.08) 0 12px, transparent 12px 24px)",
        }}
      />
      <span
        className="relative z-10 px-7 py-[18px] border-[2.5px] border-bg text-[clamp(18px,3vw,32px)] uppercase"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        FULL BLEED — substituir por screenshot
      </span>
    </div>
  );
}
