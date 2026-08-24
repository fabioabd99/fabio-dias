"use client";

import { useCallback, useId, useRef, useState } from "react";
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

// 7 slots fixos — a ordem tem de bater certo com o array gallery em projects.ts.
// Só a variant é usada agora (matte do placeholder); o rácio é comum a todos os
// slides porque as capturas são todas ~2:1.
const SHOTS = [
  { variant: "dark" as const },
  { variant: "dark" as const },
  { variant: "accent" as const },
  { variant: "dark" as const },
  { variant: "dark" as const },
  { variant: "light" as const },
  { variant: "dark" as const },
];

// Distância mínima de swipe (px) para trocar de slide.
const SWIPE_THRESHOLD = 50;

export default function ProjectGallery({ dict, gallery, deviceDesktop, deviceMobile }: Props) {
  // Mantidos no escopo para o bloco JSX comentado no fim (device frames).
  void deviceDesktop;
  void deviceMobile;

  const slides = SHOTS.map((shot, i) => ({
    variant: shot.variant,
    src: gallery?.[i]?.src,
    label: gallery?.[i]?.label ?? "",
  }));

  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const trackId = useId();

  const total = slides.length;
  const go = useCallback(
    (to: number) => setIndex(((to % total) + total) % total), // wrap nos dois sentidos
    [total],
  );
  const prev = useCallback(() => go(index - 1), [go, index]);
  const next = useCallback(() => go(index + 1), [go, index]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  }

  const current = slides[index];

  return (
    <section className="py-25 border-b-[1.5px] border-ink max-md:py-15">
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

      <div className="px-8 max-md:px-5">
        <div
          className="mx-auto w-full"
          // Numa moldura 2:1 a largura é o dobro da altura, portanto limitar a
          // 150vh de largura mantém o slide em ~75vh — cresce até encher ecrãs
          // largos sem nunca passar da altura do viewport em portáteis baixos.
          style={{ maxWidth: "min(100%, 150vh)" }}
          role="group"
          aria-roledescription="carrossel"
          aria-label={dict.label}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {/* Moldura fixa 2:1. Em mobile vai de margem a margem — o -mx-5 anula
              o padding da secção e é a única forma de a captura ganhar largura,
              que com object-contain é o que determina o tamanho da imagem. */}
          <div
            className="relative overflow-hidden border-[1.5px] border-ink aspect-2/1 max-md:-mx-5"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              id={trackId}
              className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <Slide
                  key={i}
                  {...slide}
                  hidden={i !== index}
                  priority={i === 0}
                />
              ))}
            </div>
          </div>

          {/* Legenda do slide ativo + contador */}
          <div
            className="flex items-center justify-between gap-4 mt-4 text-[11px] uppercase tracking-[0.08em]"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            <span aria-live="polite" className="truncate">
              {current.label}
            </span>
            <span className="opacity-60 shrink-0">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Controlos */}
          <div className="flex items-center gap-4 mt-4 max-md:flex-col max-md:items-stretch">
            <div className="flex gap-2 shrink-0">
              <ArrowButton onClick={prev} label="Anterior" glyph="←" controls={trackId} />
              <ArrowButton onClick={next} label="Seguinte" glyph="→" controls={trackId} />
            </div>

            {/* Barras de progresso — uma por slide, clicáveis */}
            <div className="flex gap-1.5 grow">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`${slide.label || `Slide ${i + 1}`}`}
                  aria-current={i === index}
                  aria-controls={trackId}
                  className={`h-1.5 grow border-[1.5px] border-ink transition-colors duration-250 ${
                    i === index ? "bg-accent" : "bg-transparent hover:bg-ink"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Device frames desativados por agora — descomenta quando tiveres mockups */}
      {/* <div className="grid grid-cols-[2fr_1fr] gap-8 px-8 mt-15 items-end max-md:grid-cols-1 max-md:px-5 max-md:gap-5">
        <DeviceFrame type="desktop" src={deviceDesktop} />
        <DeviceFrame type="mobile" src={deviceMobile} />
      </div> */}
    </section>
  );
}

// ─── Botão de seta ────────────────────────────────────────────────────────────

function ArrowButton({
  onClick,
  label,
  glyph,
  controls,
}: {
  onClick: () => void;
  label: string;
  glyph: string;
  controls: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-controls={controls}
      className="w-11 h-11 flex items-center justify-center border-[1.5px] border-ink text-[16px] transition-colors duration-250 hover:bg-ink hover:text-bg"
      style={{ fontFamily: "var(--font-archivo)" }}
    >
      {glyph}
    </button>
  );
}

// ─── Slide ────────────────────────────────────────────────────────────────────

function Slide({
  label,
  variant,
  src,
  hidden,
  priority,
}: {
  label: string;
  variant: "dark" | "accent" | "light";
  src?: string;
  hidden: boolean;
  priority: boolean;
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
      className="relative min-w-full h-full flex items-center justify-center overflow-hidden"
      // Evita que leitores de ecrã e Tab entrem em slides fora de vista
      inert={hidden}
    >
      {/* Matte: fundo da variant + linhas diagonais */}
      <div
        className={`absolute inset-0 ${bg}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 10px, transparent 10px 20px)",
        }}
      />
      {/* Moldura tracejada */}
      <div className={`absolute inset-3 border-2 ${borderDashed}`} />

      {src ? (
        // object-contain, nunca cover: cortar um screenshot de UI esconde
        // precisamente o que a galeria existe para mostrar.
        <div className="absolute inset-5 overflow-hidden">
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-contain"
          />
        </div>
      ) : (
        <span
          className={`relative z-10 px-4 py-2.5 border-2 ${accent || light ? "border-ink" : "border-bg"} ${bg} text-[11px] uppercase tracking-[0.08em]`}
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {label}
        </span>
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
