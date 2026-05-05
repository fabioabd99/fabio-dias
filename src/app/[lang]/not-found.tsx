import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 gap-8">
      <p
        className="text-[12px] uppercase tracking-[0.1em] text-muted"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        404
      </p>
      <h1
        className="uppercase text-center leading-none"
        style={{
          fontFamily: "var(--font-archivo)",
          fontSize: "clamp(48px, 10vw, 120px)",
          letterSpacing: "-0.04em",
        }}
      >
        Página <em className="text-accent italic">não encontrada.</em>
      </h1>
      <Link
        href="/"
        className="border-[1.5px] border-ink px-6 py-3 text-[13px] uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-bg"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        ← Voltar ao início
      </Link>
    </div>
  );
}
