# FÁBIO DIAS — Portfolio

> Brutalist portfolio built with Next.js 16, Tailwind CSS 4, and Framer Motion.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 + Lenis |
| i18n | Static JSON dictionaries (PT / EN) |
| Email | Nodemailer + Gmail SMTP |
| Deployment | Vercel |

---

## Features

- **Bilingual (PT / EN)** — URL-based locale routing via `proxy.ts`, language persisted in cookie
- **Smooth scroll** — Lenis with custom easing
- **Scroll animations** — `InView` component with Framer Motion `whileInView`
- **Hero title animation** — Letter-by-letter stagger on load
- **Project pages** — Static generation at build time (`generateStaticParams`)
- **Contact form** — Server-side with Gmail SMTP, XSS-safe, input validation
- **SEO** — `generateMetadata`, Open Graph, Twitter Card, `hreflang` alternates, `sitemap.xml`, `robots.txt`
- **Brutalist design** — `mix-blend-mode: difference` nav, grain overlay, asymmetric gallery grid

---

## Project Structure

```
src/
├── app/
│   ├── [lang]/                 # Locale layout + all pages
│   │   ├── _components/        # Home page components
│   │   ├── projects/[id]/      # Project detail pages
│   │   │   └── _components/
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/contact/            # Contact form API route
│   ├── robots.ts
│   └── sitemap.ts
├── lib/
│   ├── data/                   # Projects + experience data
│   └── i18n/                   # PT/EN JSON dictionaries
└── proxy.ts                    # Locale redirect middleware
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in GMAIL_USER and GMAIL_APP_PASSWORD

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

```env
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

For `GMAIL_APP_PASSWORD`, generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

---

## Adding a Project

Edit `src/lib/data/projects.ts` and add a new entry to the `projects` array. The page is generated automatically at build time — no other changes needed.

---

## License

MIT — feel free to use as inspiration, but please don't deploy a direct copy as your own portfolio.
