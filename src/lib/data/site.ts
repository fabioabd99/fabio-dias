// Configuração do site — valores que não mudam entre idiomas e que vários
// componentes precisam (Contact, Footer, generateMetadata futuro).
// Centralizar aqui evita ter strings duplicadas espalhadas pelo código.

// Origem única do domínio. O robots, o sitemap e os metadados importam daqui —
// antes cada um repetia o literal e tinham divergido entre si.
// A env var permite apontar deploys de preview para o seu próprio URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fabiodias.vercel.app';

export const site = {
  name: 'Fábio Dias',
  url: SITE_URL,
  email: 'fabioabdias99@gmail.com',
  github: 'https://github.com/fabioabd99',
  linkedin: 'https://www.linkedin.com/in/fabio-dias-a72569217',
  // Um CV por idioma — indexado pelo Locale da URL
  cv: {
    pt: '/cv-pt.pdf',
    en: '/cv-en.pdf',
  },
} as const;
