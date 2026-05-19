import type { Locale } from '@/lib/i18n/dictionaries';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ProjectQuickFacts {
  role: string;
  pt: { duration: string; type: string };
  en: { duration: string; type: string };
}

interface ProjectContent {
  sub: string;
  desc: string;
  about: string[];
  build: string[];
  features: Array<{ name: string; desc: string }>;
}

export interface GalleryShot {
  src?: string; // caminho a partir de /public — ex: "/projects/leafy/home.png". Vazio = placeholder.
  label: string; // texto sobreposto no placeholder; também serve de alt text
}

export interface ProjectData {
  id: string;
  slug: string;
  num: string;
  cat: string;
  year: string;
  title: string;
  titleAccent: string;
  chips: string[];
  qf: ProjectQuickFacts;
  results: Array<{ big: string; label: string }>;
  live: string;
  repo: string;
  // 7 slots fixos no mosaico — ordem importa. Ver ProjectGallery.tsx para span/ratio.
  gallery?: [
    GalleryShot,
    GalleryShot,
    GalleryShot,
    GalleryShot,
    GalleryShot,
    GalleryShot,
    GalleryShot,
  ];
  // Device mockups por baixo da galeria. Vazio = placeholder.
  deviceDesktop?: string; // ratio 16:10 — screenshot desktop
  deviceMobile?: string; // ratio 9:16 — screenshot mobile
  // Banda full-bleed entre secções (21:9). Vazio = placeholder.
  band?: string;
  pt: ProjectContent;
  en: ProjectContent;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const projects: ProjectData[] = [
  {
    id: '1',
    slug: 'leafy',
    num: '01',
    cat: 'Rede Social · IA',
    year: '2026',
    title: 'Lea',
    titleAccent: 'fy',
    chips: [
      'Next.js 16',
      'React Native',
      'Node.js',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'OpenAI',
      'Tailwind',
    ],
    qf: {
      role: 'Founder · Full-Stack',
      pt: { duration: 'Em curso', type: 'Startup · Seed' },
      en: { duration: 'Ongoing', type: 'Startup · Seed' },
    },
    results: [
      { big: '150M+', label: 'READERS TAM' },
      { big: '€18.2B', label: 'MARKET SIZE' },
      { big: 'AI', label: 'NATIVE' },
    ],
    live: '#',
    // repo: "github.com/fabioabd99/leafy", // repositório privado por agora
    repo: 'Privado',
    // Coloca os ficheiros em public/projects/leafy/ e preenche os src abaixo.
    gallery: [
      { src: '/projects/leafy/home.png', label: 'HOME · FEED' },
      { src: '/projects/leafy/book.png', label: 'BOOK PAGE' },
      { src: '/projects/leafy/recs.png', label: 'RECOMMENDATIONS' },
      { src: '/projects/leafy/library.png', label: 'LIBRARY · SHELVES' },
      { src: '/projects/leafy/club.png', label: 'READING CLUB' },
      { src: '/projects/leafy/wrapped.png', label: 'WRAPPED' },
      { src: '/projects/leafy/profile.png', label: 'PROFILE' },
    ],
    deviceDesktop: '/projects/leafy/desktop.png', // ex: '/projects/leafy/desktop.png'
    deviceMobile: '/projects/leafy/mobile.png', // ex: '/projects/leafy/mobile.png'
    band: '/projects/leafy/band.png', // ex: '/projects/leafy/band.png' (21:9 wide)
    pt: {
      sub: 'A biblioteca <strong>que te conhece</strong>. Rede social para leitores construída de raiz em torno da IA — o que o Goodreads devia ter sido em 2026.',
      desc: 'Rede social para leitores com IA nativa — biblioteca pessoal, feed personalizado, clubes de leitura e recomendação semântica.',
      about: [
        'O Goodreads tem 19 anos e estagnou desde a aquisição pela Amazon em 2013. Quis construir aquilo que <mark>devia ter sido nesta década</mark>: uma rede social literária com IA infundida em cada decisão.',
        'A Leafy combina três produtos que hoje vivem em apps diferentes — gestão de biblioteca, rede social literária e motor de recomendação por embeddings — numa só experiência cuidada ao detalhe.',
      ],
      build: [
        'Stack: <mark>Next.js 16 + React Native</mark> (Expo) para web e mobile, Node.js + Fastify no backend, PostgreSQL 17 com pgvector para embeddings semânticos, Redis para cache e filas.',
        'Pipeline de IA com cinco subsistemas: embeddings sentence-transformers, recomendação híbrida (content-based + collaborative filtering), feed ranking, LLM conversacional (GPT-4o) e OCR via Google Vision.',
      ],
      features: [
        {
          name: 'IA Nativa',
          desc: 'Embeddings + LLM em cada interação — recomendação, escrita assistida, descoberta semântica.',
        },
        {
          name: 'Estantes 3D',
          desc: 'Biblioteca com lombadas reais renderizadas — vista prateleira ou grelha.',
        },
        {
          name: 'Clubes de Leitura',
          desc: 'Chat por capítulo com proteção anti-spoilers, votação do próximo livro, leitura conjunta.',
        },
        {
          name: 'Wrapped',
          desc: 'Relatório anual estilo Spotify Wrapped — driver viral principal, partilhável em Stories.',
        },
        {
          name: 'OCR de Citações',
          desc: 'Foto → texto extraído pelo Google Vision API, classificado semanticamente.',
        },
        {
          name: 'Velas',
          desc: 'Sistema de avaliação proprietário com cinco estados — substitui as estrelas genéricas.',
        },
      ],
    },
    en: {
      sub: 'The library <strong>that knows you</strong>. A social network for readers built around AI from day one — what Goodreads should have been in 2026.',
      desc: 'AI-native social network for readers — personal library, personalised feed, reading clubs and semantic recommendation.',
      about: [
        'Goodreads is 19 years old and has stagnated since Amazon acquired it in 2013. I wanted to build what it <mark>should have been this decade</mark>: a literary social network with AI infused into every decision.',
        'Leafy combines three products that today live in different apps — library management, literary social network and embedding-based recommendation engine — into a single carefully crafted experience.',
      ],
      build: [
        'Stack: <mark>Next.js 16 + React Native</mark> (Expo) for web and mobile, Node.js + Fastify on the backend, PostgreSQL 17 with pgvector for semantic embeddings, Redis for cache and queues.',
        'AI pipeline with five subsystems: sentence-transformer embeddings, hybrid recommendation (content-based + collaborative filtering), feed ranking, conversational LLM (GPT-4o) and OCR via Google Vision.',
      ],
      features: [
        {
          name: 'AI-Native',
          desc: 'Embeddings + LLM in every interaction — recommendation, writing assistance, semantic discovery.',
        },
        {
          name: '3D Shelves',
          desc: 'Library with real rendered spines — shelf view or grid view.',
        },
        {
          name: 'Reading Clubs',
          desc: 'Per-chapter chat with anti-spoiler protection, next-book voting, group reading.',
        },
        {
          name: 'Wrapped',
          desc: 'Annual Spotify Wrapped-style report — the main viral driver, shareable to Stories.',
        },
        {
          name: 'Quote OCR',
          desc: 'Photo → text extracted via Google Vision API, semantically classified.',
        },
        {
          name: 'Candles',
          desc: 'Proprietary rating system with five states — replaces generic stars.',
        },
      ],
    },
  },
  {
    id: '2',
    slug: 'venci',
    num: '02',
    cat: 'SaaS B2B · Fintech',
    year: '2026',
    title: 'Ven',
    titleAccent: 'ci',
    chips: [
      'Next.js 16',
      'TypeScript',
      'PostgreSQL',
      'Stripe Connect',
      'Drizzle',
      'Supabase',
      'Tailwind',
      'Inngest',
    ],
    qf: {
      role: 'Founder · Full-Stack',
      pt: { duration: 'Em curso', type: 'Startup · Pre-Seed' },
      en: { duration: 'Ongoing', type: 'Startup · Pre-Seed' },
    },
    results: [
      { big: '€2.1B', label: 'SAM IBERIA' },
      { big: '340k', label: 'PROS ELEGÍVEIS' },
      { big: '5min', label: 'TIME TO REVENUE' },
    ],
    live: '#',
    // repo: "github.com/fabioabd99/venci", // repositório privado por agora
    repo: 'Privado',
    // Coloca os ficheiros em public/projects/venci/ e preenche os src abaixo.
    gallery: [
      { src: '/projects/venci/landing.png', label: 'LANDING' },
      { src: '/projects/venci/subs.png', label: 'PLAN BUILDER' },
      { src: '/projects/venci/check.png', label: 'CHECKOUT' },
      { src: '/projects/venci/dash.png', label: 'DASHBOARD' },
      { src: '/projects/venci/aa.png', label: 'SUBSCRIBERS' },
      { src: '/projects/venci/dd.png', label: 'INVOICE · AT' },
      { src: '/projects/venci/ii.png', label: 'SUBSCRIBER HUB' },
    ],
    deviceDesktop: '/projects/venci/landing.png', // ex: '/projects/venci/desktop.png'
    deviceMobile: '/projects/venci/mobile.png', // ex: '/projects/venci/mobile.png'
    band: '/projects/venci/landing.png', // ex: '/projects/venci/band.png' (21:9 wide)
    pt: {
      sub: 'O sistema operativo da <strong>economia de subscrições</strong> para profissionais portugueses — fatura certificada AT, Stripe Connect e branding próprio em 5 minutos.',
      desc: 'Plataforma all-in-one para profissionais portugueses lançarem subscrições recorrentes com fatura certificada AT integrada.',
      about: [
        'Vender subscrições em Portugal enquanto profissional é uma corrida de obstáculos: Stripe não emite fatura certificada, software vertical é caro, e a alternativa manual consome horas e falha 15-25% das cobranças.',
        "A Venci é a <mark>camada intermédia que faltava</mark> entre Stripe e os sistemas certificados portugueses (Moloni, InvoiceXpress) — desenhada para um dentista de 52 anos lançar um plano de membership em 5 minutos, sem ver as palavras 'API' ou 'webhook'.",
      ],
      build: [
        'Stack pragmática: <mark>Next.js 16 + Drizzle ORM</mark> sobre PostgreSQL 16 (Supabase) com RLS multi-tenant desde o dia 1, Stripe Connect Express para KYC e pagamentos, integração OAuth com Moloni/InvoiceXpress/Vendus para fatura certificada AT.',
        'Webhooks idempotentes com event deduplication, jobs assíncronos em Inngest, dunning automation com retentativas inteligentes. Compliance é arquitetura, não checklist — RGPD, SCA e fatura certificada são axiomas do design.',
      ],
      features: [
        {
          name: 'Plan Builder',
          desc: '6 perguntas guiadas → plano em produção em <4 minutos com template por vertical.',
        },
        {
          name: 'Fatura AT',
          desc: 'Estratégia BYOI — OAuth com Moloni/IX/Vendus emite fatura certificada após cada cobrança.',
        },
        {
          name: 'Stripe Connect',
          desc: 'KYC delegado, application fee 0.7-1% sobre GMV, SEPA + cartão + MBway.',
        },
        {
          name: 'Subscriber Hub',
          desc: 'Portal self-service do utilizador final — gerir cartão, faturas, cancelamento.',
        },
        {
          name: 'Benchmarks',
          desc: 'Dashboard com churn/ARPU comparados contra mediana da vertical — efeito de rede de dados.',
        },
        {
          name: 'Multi-tenant',
          desc: 'Row-Level Security Postgres nativa em todas as tabelas — defense-in-depth desde o dia 1.',
        },
      ],
    },
    en: {
      sub: 'The operating system of the <strong>subscription economy</strong> for Portuguese professionals — certified AT invoicing, Stripe Connect and custom branding in 5 minutes.',
      desc: 'All-in-one platform for Portuguese professionals to launch recurring subscriptions with integrated certified AT invoicing.',
      about: [
        "Selling subscriptions in Portugal as a professional is an obstacle course: Stripe doesn't issue certified invoices, vertical software is expensive, and the manual alternative eats hours and fails 15-25% of charges.",
        "Venci is the <mark>missing middle layer</mark> between Stripe and the Portuguese certified invoicing systems (Moloni, InvoiceXpress) — designed for a 52-year-old dentist to launch a membership plan in 5 minutes, never seeing the words 'API' or 'webhook'.",
      ],
      build: [
        'Pragmatic stack: <mark>Next.js 16 + Drizzle ORM</mark> over PostgreSQL 16 (Supabase) with RLS multi-tenant from day 1, Stripe Connect Express for KYC and payments, OAuth integration with Moloni/InvoiceXpress/Vendus for certified AT invoicing.',
        'Idempotent webhooks with event deduplication, async jobs on Inngest, dunning automation with smart retries. Compliance is architecture, not checklist — GDPR, SCA and certified invoicing are design axioms.',
      ],
      features: [
        {
          name: 'Plan Builder',
          desc: '6 guided questions → plan live in <4 minutes with per-vertical template.',
        },
        {
          name: 'AT Invoice',
          desc: 'BYOI strategy — OAuth with Moloni/IX/Vendus issues certified invoice on every charge.',
        },
        {
          name: 'Stripe Connect',
          desc: 'Delegated KYC, 0.7-1% application fee on GMV, SEPA + card + MBway.',
        },
        {
          name: 'Subscriber Hub',
          desc: 'End-user self-service portal — manage card, invoices, cancellation.',
        },
        {
          name: 'Benchmarks',
          desc: 'Dashboard with churn/ARPU compared to vertical median — data network effect.',
        },
        {
          name: 'Multi-tenant',
          desc: 'Native Postgres Row-Level Security on every table — defense-in-depth from day 1.',
        },
      ],
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAllProjects(): ProjectData[] {
  return projects;
}

export function getProject(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectContent(
  project: ProjectData,
  lang: Locale
): ProjectContent {
  return project[lang];
}

export function getAdjacentProjects(slug: string): {
  prev: ProjectData | undefined;
  next: ProjectData | undefined;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
