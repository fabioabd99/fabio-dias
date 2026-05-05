# Portfólio Fábio Dias — Plano de Implementação

## Context

O utilizador tem um design completo de portfólio em ficheiros HTML/CSS/JS standalone (`portefolio/`) com estética brutalista, sistema bilingue PT/EN e 5 páginas de projetos. O objetivo é converter isto para uma app Next.js 16 de qualidade de produção, aprendendo boas práticas de senior dev ao longo do processo.

**Stack instalada:** Next.js 16.2.4 · React 19.2.4 · TypeScript 5 · Tailwind CSS 4 · ESLint 9

**Design source:** `portefolio/portfolios/brutalist.html` — paleta `#f3f0e8 / #0a0a0a / #ff4500 / #2d4eff`, fontes Anton + JetBrains Mono + Instrument Serif, grain texture SVG, marquee CSS, scroll reveal com IntersectionObserver.

**Confirmado pelos docs `node_modules/next/dist/docs/`:**
- Next.js 16 renomeou `middleware.ts` → `proxy.ts` (breaking change)
- `params` é agora uma `Promise` — deve ser `await`ed
- `PageProps<'/[lang]'>` é um helper TypeScript global (sem necessidade de import)
- i18n recomendado: `app/[lang]/` + JSON dictionaries + `getDictionary` Server Component

---

## Estrutura de Ficheiros Final

```
src/
  proxy.ts                          # redireciona / → /pt (era middleware.ts)
  app/
    layout.tsx                      # root: fontes CSS vars, metadata base
    globals.css                     # @import tailwindcss + @theme tokens + keyframes
    [lang]/
      layout.tsx                    # define <html lang=>, generateStaticParams
      page.tsx                      # home page — agrega todas as secções
      not-found.tsx
      _components/                  # componentes da home (colocalização)
        Nav.tsx                     # Server Component
        LanguageToggle.tsx          # "use client" — cookie + router.push
        Hero.tsx
        About.tsx
        Skills.tsx
        Marquee.tsx                 # "use client" — pause-on-hover
        Experience.tsx
        ProjectsGrid.tsx
        ProjectCard.tsx
        Education.tsx
        Contact.tsx
        ContactForm.tsx             # "use client"
        Footer.tsx
      projects/
        [id]/
          page.tsx
          _components/
            ProjectHero.tsx
            ProjectGallery.tsx
            ProjectBuild.tsx
            ProjectFeatures.tsx
            ProjectStack.tsx
            ProjectResults.tsx
            PrevNextNav.tsx
    api/
      contact/
        route.ts                    # POST handler (form submission)
    sitemap.ts
    robots.ts
  components/
    RevealWrapper.tsx               # "use client" — IntersectionObserver
  lib/
    i18n/
      dictionaries.ts               # getDictionary, hasLocale, Locale type
      pt.json                       # traduções PT (portadas do HTML)
      en.json                       # traduções EN
    data/
      projects.ts                   # ProjectData interface + 5 projetos + helpers
      site.ts                       # SiteConfig (email, github, linkedin, etc.)
  types/
    index.ts
```

---

## Fase 1 — Fundação (começar aqui)

**O que aprendes:** `next/font` com CSS variables, Tailwind 4 `@theme`, `proxy.ts`, sistema i18n nativo do Next.js, TypeScript interfaces antes do código.

### Passos

1. **Fontes** em `app/layout.tsx`:
   - Anton (`weight: "400"` — não é variable font, string obrigatória)
   - JetBrains Mono (`weight: ["400","500","700"]`)
   - Instrument Serif (`weight: "400"`, `style: ["normal","italic"]`)
   - Cada fonte expõe `variable: "--font-anton"` etc., adicionado ao `<html className>`

2. **Design tokens** em `globals.css`:
```css
@import "tailwindcss";

@theme inline {
  --color-bg: #f3f0e8;
  --color-ink: #0a0a0a;
  --color-accent: #ff4500;
  --color-accent2: #2d4eff;
  --color-paper: #e8e3d6;
  --font-display: var(--font-anton);
  --font-mono: var(--font-jetbrains);
  --font-serif: var(--font-instrument);
}
```
   Cria classes `bg-bg`, `text-ink`, `text-accent`, `font-display`, etc. automaticamente.

3. **`proxy.ts`** (crítico — não `middleware.ts`):
```ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["pt", "en"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  if (hasLocale) return
  const lang = request.cookies.get("lang")?.value ?? "pt"
  request.nextUrl.pathname = `/${lang}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = { matcher: ["/((?!_next|api|favicon.ico).*)"] }
```

4. **i18n** em `lib/i18n/dictionaries.ts`:
```ts
import "server-only"  // garante que traduções nunca vão para o cliente

export type Locale = "pt" | "en"
export function hasLocale(lang: string): lang is Locale {
  return lang === "pt" || lang === "en"
}
export async function getDictionary(lang: Locale) {
  return (await import(`./${lang}.json`)).default
}
```

5. **`pt.json` e `en.json`** — portar as traduções do `portefolio/shared/translations.js` para JSON estruturado por secção: `nav`, `hero`, `about`, `skills`, `experience`, `work`, `education`, `contact`, `footer`.

6. **`lib/data/projects.ts`** — TypeScript interface + 5 projetos:
```ts
interface ProjectData {
  id: string
  num: string
  cat: string
  year: string
  title: string
  chips: string[]
  results: Array<{ big: string; label: string }>
  live: string
  repo: string
  pt: { sub: string; about: string[]; build: string[]; features: Array<{ name: string; desc: string }> }
  en: { sub: string; about: string[]; build: string[]; features: Array<{ name: string; desc: string }> }
}
```

7. **`app/[lang]/layout.tsx`**:
```tsx
export async function generateStaticParams() {
  return [{ lang: "pt" }, { lang: "en" }]
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  return <html lang={lang}>{children}</html>
}
```

---

## Fase 2 — Home Page

**O que aprendes:** Fronteira Server/Client Components na prática, props narrowing, `generateStaticParams`, CSS animations no Tailwind 4.

**Padrão da `page.tsx`:**
```tsx
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main>
        <Hero dict={dict.hero} />
        <About dict={dict.about} />
        <Skills dict={dict.skills} />
        <Experience dict={dict.experience} />
        <ProjectsGrid dict={dict.work} lang={lang} />
        <Education dict={dict.education} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </>
  )
}
```

**Regras Server vs Client:**
- Server (padrão): Nav, Hero, About, Skills, Experience, ProjectsGrid, Education, Contact, Footer
- Client (`"use client"`): `LanguageToggle` (cookie + router), `Marquee` (hover), `ContactForm` (estado)

**Grain overlay** — apenas CSS em `globals.css` (pseudo-elemento, não componente React):
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG feTurbulence */
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
}
```

**Marquee** — CSS puro, sem biblioteca. Lista duplicada + `@keyframes scroll { to { transform: translateX(-50%) } }`.

---

## Fase 3 — Páginas de Projeto

**O que aprendes:** `generateStaticParams` com segmentos aninhados, `notFound()`, composição de dados tipados.

**`app/[lang]/projects/[id]/page.tsx`:**
```tsx
export async function generateStaticParams() {
  return ["pt", "en"].flatMap(lang =>
    ["1", "2", "3", "4", "5"].map(id => ({ lang, id }))
  )
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[id]">) {
  const { lang, id } = await params
  if (!hasLocale(lang)) notFound()
  const project = getProject(id)
  if (!project) notFound()
  const dict = await getDictionary(lang)
  const content = project[lang]
  const { prev, next } = getAdjacentProjects(id)

  return (/* secções do projeto */)
}
```

**Helpers em `lib/data/projects.ts`:**
```ts
export function getProject(id: string): ProjectData | undefined
export function getAdjacentProjects(id: string): { prev?: ProjectData; next?: ProjectData }
```

**Títulos com HTML:** Reestruturar dados — `title: string` simples + `titleAccent?: string` separado, renderizado como `<span className="text-accent">`. Não usar `dangerouslySetInnerHTML` desnecessariamente.

---

## Fase 4 — Interatividade

**O que aprendes:** `useEffect` + DOM APIs, cookies vs localStorage, Route Handlers.

**Scroll reveal** via `RevealWrapper` (`"use client"`):
```tsx
export function RevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      {children}
    </div>
  )
}
```

**Language persistence:** Cookie (não localStorage) — cookies cruzam a fronteira server/client:
```ts
// Em LanguageToggle após router.push:
document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`
```

**Contact form API** em `app/api/contact/route.ts`:
```ts
export async function POST(request: Request) {
  const body = await request.json()
  // validar + enviar email (Resend ou log por agora)
  return Response.json({ ok: true })
}
```

---

## Fase 5 — SEO & Polimento

**O que aprendes:** `generateMetadata`, `hreflang`, `sitemap.ts`, acessibilidade.

```ts
export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(hasLocale(lang) ? lang : "pt")
  return {
    title: `Fábio Dias — ${dict.hero.role}`,
    description: dict.hero.description,
    alternates: {
      canonical: `https://fabiodias.dev/${lang}`,
      languages: { pt: "/pt", en: "/en" }
    }
  }
}
```

**Acessibilidade:** `aria-hidden="true"` no marquee (decorativo), `focus-visible:` para todos os interativos, contraste: `#ff4500` apenas em texto display grande (passa WCAG AA para large text).

---

## Ordem de Implementação

1. **Fase 1** — `proxy.ts`, fontes, `globals.css` tokens, `lib/i18n/`, `lib/data/projects.ts`
2. **Fase 2** — `app/[lang]/layout.tsx`, `page.tsx`, todos os `_components/` da home
3. **Fase 3** — `app/[lang]/projects/[id]/page.tsx` + componentes de projeto
4. **Fase 4** — `RevealWrapper`, `LanguageToggle` com cookie, `ContactForm`, Route Handler
5. **Fase 5** — `generateMetadata`, `sitemap.ts`, `robots.ts`, a11y audit

---

## Verificação

```bash
# Dev server
npm run dev

# Verificar rotas
# / → redireciona para /pt
# /pt e /en → home page bilingue
# /pt/projects/1 até /pt/projects/5 → páginas de projeto
# /en/projects/1 até /en/projects/5 → versão inglesa

# Build estático
npm run build
# Deve gerar 12 páginas estáticas (2 langs × (1 home + 5 projetos))
```

---

## Ficheiros Críticos a Modificar

- [src/app/layout.tsx](src/app/layout.tsx) — fontes + metadata base
- [src/app/globals.css](src/app/globals.css) — Tailwind 4 `@theme` + grain + keyframes
- `src/proxy.ts` — (novo) locale redirect
- `src/app/[lang]/layout.tsx` — (novo) locale layout
- `src/app/[lang]/page.tsx` — (novo) home page
- `src/lib/i18n/` — (novo) sistema de traduções
- `src/lib/data/projects.ts` — (novo) dados dos projetos
