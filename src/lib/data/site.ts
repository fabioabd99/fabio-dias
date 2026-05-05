// Configuração do site — valores que não mudam entre idiomas e que vários
// componentes precisam (Contact, Footer, generateMetadata futuro).
// Centralizar aqui evita ter strings duplicadas espalhadas pelo código.

export const site = {
  name: 'Fábio Dias',
  url: 'https://fabiodias.dev',
  email: 'fabioabdias99@gmail.com',
  phone: '+351 935837507',
  github: 'https://github.com/fabioabd99',
  linkedin: 'https://www.linkedin.com/in/fabio-dias-a72569217',
  cv: '/cv.pdf',
} as const;
