import Image from "next/image";

// Banda full-bleed entre secções (21:9). Quando src está presente mostra a imagem
// com backdrop blur; caso contrário, placeholder com linhas diagonais.
export default function ProjectBand({ src }: { src?: string }) {
  if (src) {
    return (
      <div
        className="relative overflow-hidden border-b-[1.5px] border-ink bg-ink"
        style={{ aspectRatio: "21/9" }}
      >
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover scale-110 blur-2xl opacity-60"
        />
        <Image
          src={src}
          alt="Project screenshot"
          fill
          sizes="100vw"
          className="object-contain relative"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden bg-ink text-bg border-b-[1.5px] border-ink"
      style={{ aspectRatio: "21/9" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,91,34,0.08) 0 12px, transparent 12px 24px)",
        }}
      />
      <span
        className="relative z-10 px-7 py-4.5 border-[2.5px] border-bg text-[clamp(18px,3vw,32px)] uppercase"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        FULL BLEED — substituir por screenshot
      </span>
    </div>
  );
}
