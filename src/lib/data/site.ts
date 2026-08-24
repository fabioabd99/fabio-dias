// Configuração do site — valores que não mudam entre idiomas e que vários
// componentes precisam (Contact, Footer, generateMetadata futuro).
// Centralizar aqui evita ter strings duplicadas espalhadas pelo código.

export const site = {
  name: 'Fábio Dias',
  url: 'https://fabiodias.dev',
  email: 'fabioabdias99@gmail.com',
  github: 'https://github.com/fabioabd99',
  linkedin: 'https://www.linkedin.com/in/fabio-dias-a72569217',
  // Um CV por idioma — indexado pelo Locale da URL
  cv: {
    pt: '/cv-pt.pdf',
    en: '/cv-en.pdf',
  },
} as const;
