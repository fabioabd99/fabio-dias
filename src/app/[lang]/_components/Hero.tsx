import Image from 'next/image';
import AnimatedHeroTitle from './AnimatedHeroTitle';
import FadeUp from './FadeUp';

interface HeroDict {
  status: string;
  location: string;
  line1: string;
  line2: string;
  tagline: string;
  scroll: string;
}

interface Props {
  dict: HeroDict;
}

export default function Hero({ dict }: Props) {
  return (
    <header className="min-h-screen relative overflow-hidden flex flex-col justify-center px-8 max-md:px-5 max-md:justify-between max-md:pt-25 max-md:pb-8">

      {/* Desktop: foto absoluta full-height a sangrar pela direita */}
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-[40vw] pointer-events-none select-none"
        aria-hidden="true"
        style={{
          WebkitMaskImage: `
            linear-gradient(to right,  transparent 0%, black 22%, black 88%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 14%, black 100%)
          `,
          WebkitMaskComposite: 'source-in',
          maskImage: `
            linear-gradient(to right,  transparent 0%, black 22%, black 88%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, black 14%, black 100%)
          `,
          maskComposite: 'intersect',
        }}
      >
        <Image
          src="/me.png"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="40vw"
        />
      </div>

      {/* Título animado — letras sobem com stagger ao carregar */}
      <AnimatedHeroTitle line1={dict.line1} line2={dict.line2} />

      {/* Mobile: foto full-bleed entre título e tagline */}
      <div
        className="md:hidden relative -mx-5 mt-8 overflow-hidden shrink-0"
        style={{ height: '65vw' }}
        aria-hidden="true"
      >
        <Image
          src="/me.png"
          alt=""
          fill
          className="object-cover object-[center_8%]"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--color-bg) 0%, transparent 18%, transparent 72%, var(--color-bg) 100%)',
          }}
        />
      </div>

      {/* Tagline + scroll cue — absolute no fundo em desktop, flow em mobile */}
      <FadeUp delay={0.5} className="md:absolute md:bottom-15 md:left-8 md:right-8 relative flex items-end justify-between gap-10">
        <p
          className="hero-tagline text-[20px] leading-[1.4] max-w-105"
          dangerouslySetInnerHTML={{ __html: dict.tagline }}
        />
        <div className="font-mono text-xs uppercase tracking-[0.08em] flex items-center gap-2 shrink-0">
          {dict.scroll}
          <span className="inline-block animate-bob">↓</span>
        </div>
      </FadeUp>

    </header>
  );
}
