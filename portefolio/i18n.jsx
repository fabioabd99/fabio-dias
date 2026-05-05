// Translations shared across all variants
const I18N = {
  pt: {
    nav: { about: "Sobre", skills: "Skills", work: "Projetos", experience: "Experiência", contact: "Contacto" },
    hero: {
      role: "Web Developer",
      tagline: "Construo a web,",
      tagline2: "pixel a pixel.",
      bio: "Web developer focado em criar experiências digitais rápidas, acessíveis e memoráveis. Apaixonado por código limpo e produtos que importam.",
      cta: "Vê o meu trabalho",
      cta2: "Descarregar CV",
      available: "Disponível para projetos",
      based: "Baseado em Portugal",
    },
    sections: {
      about: "Sobre mim",
      skills: "Stack & Skills",
      skillsSub: "Tecnologias com que trabalho diariamente",
      work: "Projetos selecionados",
      workSub: "Uma seleção do meu trabalho recente",
      experience: "Experiência",
      experienceSub: "Onde tenho construído coisas",
      education: "Formação",
      contact: "Vamos falar",
      contactSub: "Tens um projeto em mente? Adoraria ouvir.",
    },
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Bases de Dados",
      tools: "Ferramentas",
    },
    contact: {
      name: "Nome",
      email: "Email",
      message: "Mensagem",
      messagePh: "Conta-me sobre o teu projeto…",
      send: "Enviar mensagem",
      sent: "Mensagem enviada ✓",
      or: "ou envia-me um email diretamente",
    },
    work: {
      view: "Ver projeto",
      code: "Código",
    },
    footer: {
      built: "Construído com",
      rights: "Todos os direitos reservados",
    },
    exp: {
      present: "Atual",
    },
  },
  en: {
    nav: { about: "About", skills: "Skills", work: "Work", experience: "Experience", contact: "Contact" },
    hero: {
      role: "Web Developer",
      tagline: "Building the web,",
      tagline2: "one pixel at a time.",
      bio: "Web developer focused on creating fast, accessible, and memorable digital experiences. Passionate about clean code and products that matter.",
      cta: "See my work",
      cta2: "Download CV",
      available: "Available for projects",
      based: "Based in Portugal",
    },
    sections: {
      about: "About me",
      skills: "Stack & Skills",
      skillsSub: "Technologies I work with daily",
      work: "Selected work",
      workSub: "A selection of my recent projects",
      experience: "Experience",
      experienceSub: "Where I've been building",
      education: "Education",
      contact: "Let's talk",
      contactSub: "Got a project in mind? I'd love to hear about it.",
    },
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      database: "Databases",
      tools: "Tools",
    },
    contact: {
      name: "Name",
      email: "Email",
      message: "Message",
      messagePh: "Tell me about your project…",
      send: "Send message",
      sent: "Message sent ✓",
      or: "or email me directly",
    },
    work: {
      view: "View project",
      code: "Code",
    },
    footer: {
      built: "Built with",
      rights: "All rights reserved",
    },
    exp: {
      present: "Present",
    },
  },
};

// Shared portfolio content (placeholders the user will edit)
const PORTFOLIO_DATA = {
  name: "Fábio Dias",
  email: "fabio.dias@email.com",
  phone: "+351 900 000 000",
  location: "Lisboa, Portugal",
  github: "github.com/fabiodias",
  linkedin: "linkedin.com/in/fabiodias",
  cv: "#",

  skills: {
    frontend: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 98 },
    ],
    backend: [
      { name: "PHP", level: 95 },
      { name: "Laravel", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "REST APIs", level: 90 },
    ],
    database: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 70 },
    ],
    tools: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Figma", level: 75 },
      { name: "Vite", level: 85 },
    ],
  },

  projects: [
    {
      id: "01",
      name: "Projeto Placeholder 01",
      tagline: { pt: "E-commerce com painel de administração completo", en: "E-commerce with full admin dashboard" },
      tags: ["Laravel", "React", "MySQL", "Stripe"],
      year: "2025",
      color: "#FF5B3D",
    },
    {
      id: "02",
      name: "Projeto Placeholder 02",
      tagline: { pt: "Plataforma SaaS para gestão de equipas remotas", en: "SaaS platform for remote team management" },
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
      year: "2024",
      color: "#3D7BFF",
    },
    {
      id: "03",
      name: "Projeto Placeholder 03",
      tagline: { pt: "API REST para app mobile com 50K+ utilizadores", en: "REST API for mobile app with 50K+ users" },
      tags: ["PHP", "Laravel", "Redis", "Docker"],
      year: "2024",
      color: "#9B5BFF",
    },
    {
      id: "04",
      name: "Projeto Placeholder 04",
      tagline: { pt: "Dashboard de analytics em tempo real", en: "Real-time analytics dashboard" },
      tags: ["React", "Node.js", "WebSockets", "Chart.js"],
      year: "2023",
      color: "#00C896",
    },
  ],

  experience: [
    {
      role: "Web Developer",
      company: "Empresa Placeholder",
      period: { start: "2023", end: "present" },
      summary: {
        pt: "Desenvolvimento full-stack de aplicações web modernas. Lidero a refatoração do front-end para React.",
        en: "Full-stack development of modern web applications. Leading the front-end refactor to React.",
      },
    },
    {
      role: "Junior Developer",
      company: "Empresa Placeholder",
      period: { start: "2021", end: "2023" },
      summary: {
        pt: "Trabalhei em sites WordPress e aplicações Laravel para clientes em retail e SaaS.",
        en: "Worked on WordPress sites and Laravel applications for clients in retail and SaaS.",
      },
    },
    {
      role: "Freelance Developer",
      company: "Self-employed",
      period: { start: "2020", end: "2021" },
      summary: {
        pt: "Desenvolvimento de landing pages e sites institucionais para PMEs.",
        en: "Developed landing pages and corporate websites for SMEs.",
      },
    },
  ],

  education: [
    {
      degree: "Licenciatura em Engenharia Informática",
      school: "Instituto Placeholder",
      period: "2018 — 2021",
    },
    {
      degree: "Curso Profissional de Programação Web",
      school: "Escola Placeholder",
      period: "2016 — 2018",
    },
  ],
};

window.I18N = I18N;
window.PORTFOLIO_DATA = PORTFOLIO_DATA;
