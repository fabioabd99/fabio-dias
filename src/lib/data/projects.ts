import type { Locale } from "@/lib/i18n/dictionaries";

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
  pt: ProjectContent;
  en: ProjectContent;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const projects: ProjectData[] = [
  {
    id: "1",
    slug: "lorem-commerce",
    num: "01",
    cat: "E-Commerce",
    year: "2024",
    title: "Lorem",
    titleAccent: "Commerce",
    chips: ["PHP", "React", "Tailwind", "MySQL", "Stripe", "Redis", "WebSockets"],
    qf: {
      role: "Full-Stack",
      pt: { duration: "6 meses", type: "Pessoal" },
      en: { duration: "6 months", type: "Personal" },
    },
    results: [
      { big: "MVP",   label: "IN 6 MONTHS" },
      { big: "12+",   label: "KEY FEATURES" },
      { big: "4.9/5", label: "LIGHTHOUSE" },
    ],
    live: "#",
    repo: "github.com/fabio/lorem",
    pt: {
      sub: "Plataforma de e-commerce <strong>multi-vendedor</strong> com gestão de stocks em tempo real, checkout Stripe e dashboard analítico.",
      desc: "Plataforma e-commerce headless com checkout repensado de raiz para maximizar conversão.",
      about: [
        "Quis perceber até onde conseguia levar uma <mark>plataforma multi-vendedor</mark> sozinho — frontend, backend, pagamentos e dashboard num único produto coerente.",
        "A ideia: imaginar um mercado online onde várias lojas operam em simultâneo, com stocks sincronizados e analytics em tempo real, sem comprometer simplicidade.",
      ],
      build: [
        "Backend em <mark>PHP puro com arquitetura MVC própria</mark>, frontend em React + Tailwind. Integrei Stripe Connect para distribuir pagamentos automaticamente entre lojas.",
        "Stock atualizado por webhooks, dashboard com WebSockets para updates ao vivo, e relatórios PDF gerados on-demand.",
      ],
      features: [
        { name: "Multi-tenant", desc: "Cada loja com o seu próprio domínio, branding e regras." },
        { name: "Stripe Connect", desc: "Split automático de pagamentos entre vendedores." },
        { name: "Stock Live", desc: "Sincronização real-time via WebSockets e webhooks." },
        { name: "Analytics", desc: "Dashboard com KPIs, funil de conversão e cohorts." },
      ],
    },
    en: {
      sub: "Multi-vendor <strong>e-commerce</strong> platform with real-time stock management, Stripe checkout and analytics dashboard.",
      desc: "Headless e-commerce platform with a checkout rebuilt from scratch to maximize conversion.",
      about: [
        "I wanted to see how far I could take a <mark>multi-vendor platform</mark> on my own — frontend, backend, payments and dashboard in a single coherent product.",
        "The idea: imagine an online marketplace where several stores operate simultaneously, with synced stocks and real-time analytics, without sacrificing simplicity.",
      ],
      build: [
        "Backend in <mark>vanilla PHP with custom MVC architecture</mark>, frontend in React + Tailwind. Integrated Stripe Connect to auto-split payments between stores.",
        "Stock updated via webhooks, dashboard with WebSockets for live updates, and on-demand PDF reports.",
      ],
      features: [
        { name: "Multi-tenant", desc: "Each store with its own domain, branding and rules." },
        { name: "Stripe Connect", desc: "Automatic payment split between sellers." },
        { name: "Stock Live", desc: "Real-time sync via WebSockets and webhooks." },
        { name: "Analytics", desc: "Dashboard with KPIs, conversion funnel and cohorts." },
      ],
    },
  },
  {
    id: "2",
    slug: "pixel-dashboard",
    num: "02",
    cat: "Dashboard",
    year: "2024",
    title: "Pixel",
    titleAccent: "Dashboard",
    chips: ["React", "TypeScript", "Tailwind", "PHP", "MySQL", "REST"],
    qf: {
      role: "Frontend",
      pt: { duration: "4 meses", type: "Pessoal" },
      en: { duration: "4 months", type: "Personal" },
    },
    results: [
      { big: "<200ms", label: "P95 LATENCY" },
      { big: "−90%",   label: "BUNDLE SIZE" },
      { big: "60fps",  label: "CONSISTENT" },
    ],
    live: "#",
    repo: "github.com/fabio/pixel",
    pt: {
      sub: "Dashboard <strong>analítico em tempo real</strong> — KPIs, cohorts, funis e alertas configuráveis.",
      desc: "Dashboard analítico para equipas de produto com métricas em tempo real via WebSockets.",
      about: [
        "Queria desenhar um dashboard que fosse <mark>rápido sem depender de bibliotecas pesadas</mark>. As ferramentas off-the-shelf são lentas e genéricas — quis fazer melhor.",
        "O foco foi sempre experiência: dados visíveis em &lt;200ms, gráficos custom, e atalhos para power users.",
      ],
      build: [
        "Frontend em <mark>React + TypeScript</mark> com queries optimistas, virtualização de listas grandes e gráficos custom em SVG (sem libs pesadas).",
        "Backend em PHP a servir dados via API REST com cache agressivo. Sistema de alertas via webhook + email.",
      ],
      features: [
        { name: "Real-time", desc: "Updates por polling, diff de estado < 200ms." },
        { name: "SVG Charts", desc: "Gráficos custom sem libs — 90% mais leves." },
        { name: "Alerts", desc: "Threshold-based com integração webhook/email." },
        { name: "Cohorts", desc: "Análise de retenção e LTV por segmento." },
      ],
    },
    en: {
      sub: "Real-time <strong>analytics dashboard</strong> — KPIs, cohorts, funnels and configurable alerts.",
      desc: "Analytics dashboard for product teams with real-time metrics over WebSockets.",
      about: [
        "I wanted to design a dashboard that was <mark>fast without depending on heavy libraries</mark>. Off-the-shelf tools are slow and generic — I wanted to do better.",
        "The focus was always experience: data visible in &lt;200ms, custom charts, and shortcuts for power users.",
      ],
      build: [
        "Frontend in <mark>React + TypeScript</mark> with optimistic queries, large-list virtualization and custom SVG charts (no heavy libs).",
        "PHP backend serving data via REST API with aggressive caching. Alert system via webhook + email.",
      ],
      features: [
        { name: "Real-time", desc: "Polling updates, state diff < 200ms." },
        { name: "SVG Charts", desc: "Custom charts no libs — 90% lighter." },
        { name: "Alerts", desc: "Threshold-based with webhook/email integration." },
        { name: "Cohorts", desc: "Retention and LTV analysis by segment." },
      ],
    },
  },
  {
    id: "3",
    slug: "book-flow",
    num: "03",
    cat: "CMS",
    year: "2023",
    title: "Book",
    titleAccent: "Flow",
    chips: ["PHP", "Alpine.js", "Tailwind", "MySQL"],
    qf: {
      role: "Full-Stack",
      pt: { duration: "5 meses", type: "Pessoal" },
      en: { duration: "5 months", type: "Personal" },
    },
    results: [
      { big: "2000+",  label: "TITLES SUPPORTED" },
      { big: "<100ms", label: "SEARCH SPEED" },
      { big: "5x",     label: "FASTER FLOW" },
    ],
    live: "#",
    repo: "github.com/fabio/bookflow",
    pt: {
      sub: "<strong>CMS dedicado a editoras</strong> — gestão de catálogos, autores e direitos digitais.",
      desc: "Site institucional para editora independente com CMS custom para gestão de catálogo e autores.",
      about: [
        "Editoras gerem catálogos enormes em folhas de cálculo. Quis explorar como seria um <mark>CMS feito para o problema deles</mark>, com workflow de aprovação e histórico completo.",
        "O objetivo: substituir o caos de Excel + email por uma ferramenta única, auditável, e rápida.",
      ],
      build: [
        "CMS construído em <mark>PHP + Alpine.js + Tailwind</mark>. Admin panel custom com workflows multi-passo para aprovações de capa e contratos.",
        "Versionamento automático de cada campo, log de auditoria, e exportação em formatos da indústria (ONIX, PDF).",
      ],
      features: [
        { name: "Workflow", desc: "Aprovações multi-passo com role-based." },
        { name: "Audit", desc: "Quem alterou o quê, quando, com diff visual." },
        { name: "ONIX Export", desc: "Formato standard da indústria livreira." },
        { name: "Search", desc: "Pesquisa fuzzy em 2000+ títulos < 100ms." },
      ],
    },
    en: {
      sub: "<strong>CMS for publishers</strong> — catalog, author and digital rights management.",
      desc: "Institutional site for an independent publisher with a custom CMS for catalog and author management.",
      about: [
        "Publishers manage huge catalogs in spreadsheets. I wanted to explore what a <mark>CMS built for their problem</mark> would look like, with approval workflow and full history.",
        "The goal: replace the Excel + email chaos with a single, auditable, fast tool.",
      ],
      build: [
        "CMS built in <mark>PHP + Alpine.js + Tailwind</mark>. Custom admin panel with multi-step workflows for cover and contract approvals.",
        "Automatic field-level versioning, audit log, and export in industry formats (ONIX, PDF).",
      ],
      features: [
        { name: "Workflow", desc: "Multi-step role-based approvals." },
        { name: "Audit", desc: "Who changed what, when, with visual diff." },
        { name: "ONIX Export", desc: "Industry-standard publishing format." },
        { name: "Search", desc: "Fuzzy search across 2000+ titles < 100ms." },
      ],
    },
  },
  {
    id: "4",
    slug: "task-nova",
    num: "04",
    cat: "Productivity",
    year: "2025",
    title: "Task",
    titleAccent: "Nova",
    chips: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind", "Yjs"],
    qf: {
      role: "Full-Stack",
      pt: { duration: "8 meses", type: "Pessoal" },
      en: { duration: "8 months", type: "Personal" },
    },
    results: [
      { big: "0ms",   label: "PERCEIVED LATENCY" },
      { big: "100%",  label: "OFFLINE READY" },
      { big: "60fps", label: "CONSISTENT" },
    ],
    live: "#",
    repo: "github.com/fabio/tasknova",
    pt: {
      sub: "App de <strong>produtividade colaborativa</strong> com sync offline-first, atalhos de teclado a sério, e zero spinners.",
      desc: "Gestor de tarefas e projetos focado em simplicidade — o oposto do Jira para equipas pequenas.",
      about: [
        "Apps de tarefas modernas são lentas e dependem de internet. Eu queria algo <mark>local-first</mark> que funcionasse perfeitamente offline.",
        "Sync entre dispositivos sem conflitos, e atalhos de teclado para tudo — sem precisar tocar no rato.",
      ],
      build: [
        "<mark>Next.js + IndexedDB</mark> para storage local, sync por CRDT (Yjs) com servidor PostgreSQL.",
        "UI 60fps consistente, command palette tipo Linear, e atalhos vim-style para power users.",
      ],
      features: [
        { name: "Offline-first", desc: "Funciona sem internet, sync quando volta." },
        { name: "CRDT Sync", desc: "Merge automático sem conflitos entre devices." },
        { name: "Cmd-K", desc: "Command palette para tudo, fuzzy search." },
        { name: "Vim Mode", desc: "Atalhos j/k/x/gg para os power users." },
      ],
    },
    en: {
      sub: "<strong>Collaborative productivity</strong> app with offline-first sync, serious keyboard shortcuts, and zero spinners.",
      desc: "Task and project manager focused on simplicity — the opposite of Jira for small teams.",
      about: [
        "Modern todo apps are slow and depend on the internet. I wanted something <mark>local-first</mark> that worked perfectly offline.",
        "Cross-device sync without conflicts, and keyboard shortcuts for everything — without ever touching the mouse.",
      ],
      build: [
        "<mark>Next.js + IndexedDB</mark> for local storage, CRDT-based sync (Yjs) with a PostgreSQL server.",
        "60fps consistent UI, Linear-style command palette, and vim-style shortcuts for power users.",
      ],
      features: [
        { name: "Offline-first", desc: "Works offline, syncs when back online." },
        { name: "CRDT Sync", desc: "Automatic conflict-free merging across devices." },
        { name: "Cmd-K", desc: "Command palette for everything, fuzzy search." },
        { name: "Vim Mode", desc: "j/k/x/gg shortcuts for power users." },
      ],
    },
  },
  {
    id: "5",
    slug: "green-api",
    num: "05",
    cat: "API",
    year: "2023",
    title: "Green",
    titleAccent: "API",
    chips: ["PHP", "MySQL", "REST", "Docker", "OpenAPI"],
    qf: {
      role: "Backend",
      pt: { duration: "3 meses", type: "Open source" },
      en: { duration: "3 months", type: "Open source" },
    },
    results: [
      { big: "50+",   label: "DATA SOURCES" },
      { big: "10k/d", label: "FREE REQUESTS" },
      { big: "99.9%", label: "UPTIME" },
    ],
    live: "#",
    repo: "github.com/fabio/greenapi",
    pt: {
      sub: "API pública de <strong>dados ambientais</strong> — qualidade do ar, consumo energético e CO₂. Open source e gratuita.",
      desc: "Backend robusto para app mobile fintech, com foco em segurança e tempos de resposta abaixo dos 100ms.",
      about: [
        "Dados ambientais existem espalhados por <mark>50+ portais</mark>, em formatos diferentes. Quis construir uma API REST simples, documentada, com tier gratuito generoso.",
        "O projeto começou como um exercício pessoal e cresceu para algo que outros developers podem usar nos seus projetos.",
      ],
      build: [
        "<mark>PHP + MySQL</mark> com workers Cron a fazer scraping/parsing diário e a normalizar para um schema único.",
        "Documentação OpenAPI, dashboard de status público, rate limiting justo e tier gratuito (10k req/dia).",
      ],
      features: [
        { name: "OpenAPI", desc: "Documentação interativa, SDK auto-gerado." },
        { name: "Daily Sync", desc: "Workers cron normalizam 50+ fontes/dia." },
        { name: "Free Tier", desc: "10k requests/dia sem auth, ideal hackathons." },
        { name: "Open Source", desc: "Código MIT no GitHub, contribuições aceites." },
      ],
    },
    en: {
      sub: "Public API of <strong>environmental data</strong> — air quality, energy consumption and CO₂. Open source and free.",
      desc: "Robust backend for a fintech mobile app, focused on security and sub-100ms response times.",
      about: [
        "Environmental data exists scattered across <mark>50+ portals</mark>, in different formats. I wanted to build a simple, documented REST API with a generous free tier.",
        "The project started as a personal exercise and grew into something other developers can use in their projects.",
      ],
      build: [
        "<mark>PHP + MySQL</mark>, with Cron workers running daily scraping/parsing and normalising to a unified schema.",
        "OpenAPI documentation, public status dashboard, fair rate limiting and free tier (10k req/day).",
      ],
      features: [
        { name: "OpenAPI", desc: "Interactive docs, auto-generated SDK." },
        { name: "Daily Sync", desc: "Cron workers normalise 50+ sources/day." },
        { name: "Free Tier", desc: "10k requests/day no auth, hackathon-friendly." },
        { name: "Open Source", desc: "MIT code on GitHub, contributions welcome." },
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

export function getProjectContent(project: ProjectData, lang: Locale): ProjectContent {
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
