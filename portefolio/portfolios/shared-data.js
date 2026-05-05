// Shared data for all portfolio variations
window.PORTFOLIO_DATA = {
  name: "Fábio Dias",
  title: { pt: "Web Developer", en: "Web Developer" },
  tagline: {
    pt: "Construo a web, pixel a pixel.",
    en: "Building the web, one pixel at a time."
  },
  intro: {
    pt: "Desenvolvo experiências digitais rápidas, acessíveis e bem desenhadas. Com foco em produto, escrevo código limpo e colaboro de perto com designers e equipas.",
    en: "I build fast, accessible and well-crafted digital experiences. Product-focused, I write clean code and collaborate closely with designers and teams."
  },
  location: { pt: "Portugal · Disponível para projetos", en: "Portugal · Open to opportunities" },

  stats: [
    { value: "30+", label: { pt: "Projetos entregues", en: "Projects shipped" } },
    { value: "5", label: { pt: "Anos a programar", en: "Years coding" } },
    { value: "12+", label: { pt: "Tecnologias", en: "Technologies" } },
    { value: "100%", label: { pt: "Comprometimento", en: "Dedication" } }
  ],

  technologies: {
    frontend: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["PHP", "Laravel", "Node.js", "Express", "REST APIs", "GraphQL"],
    database: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    tools: ["Git", "Docker", "Figma", "Vite", "Webpack", "CI/CD"]
  },

  experience: [
    {
      role: { pt: "Web Developer Sénior", en: "Senior Web Developer" },
      company: "[ Empresa Atual ]",
      period: "2023 — " + ({ pt: "Presente", en: "Present" }).en,
      periodPt: "2023 — Presente",
      periodEn: "2023 — Present",
      description: {
        pt: "Placeholder: descreve responsabilidades, stack usada, impacto em métricas e projetos liderados.",
        en: "Placeholder: describe responsibilities, stack used, metric impact and projects you led."
      }
    },
    {
      role: { pt: "Full-Stack Developer", en: "Full-Stack Developer" },
      company: "[ Empresa Anterior ]",
      periodPt: "2021 — 2023",
      periodEn: "2021 — 2023",
      description: {
        pt: "Placeholder: APIs REST, integrações, dashboards e migrações para frameworks modernas.",
        en: "Placeholder: REST APIs, integrations, dashboards and migrations to modern frameworks."
      }
    },
    {
      role: { pt: "Junior Web Developer", en: "Junior Web Developer" },
      company: "[ Primeira Empresa ]",
      periodPt: "2020 — 2021",
      periodEn: "2020 — 2021",
      description: {
        pt: "Placeholder: primeiras experiências profissionais, contribuições em equipas ágeis.",
        en: "Placeholder: first professional experiences, agile team contributions."
      }
    }
  ],

  education: [
    {
      degree: { pt: "Licenciatura em Engenharia Informática", en: "BSc Computer Engineering" },
      school: "[ Universidade ]",
      periodPt: "2017 — 2020",
      periodEn: "2017 — 2020"
    },
    {
      degree: { pt: "Curso Profissional · Programação", en: "Professional Course · Programming" },
      school: "[ Escola Secundária ]",
      periodPt: "2014 — 2017",
      periodEn: "2014 — 2017"
    },
    {
      degree: { pt: "Certificação · Full-Stack", en: "Certification · Full-Stack" },
      school: "[ Plataforma Online ]",
      periodPt: "2022",
      periodEn: "2022"
    }
  ],

  projects: [
    {
      name: "[ Projeto 01 ]",
      tagline: { pt: "E-commerce headless com checkout custom", en: "Headless e-commerce with custom checkout" },
      tech: ["React", "Laravel", "MySQL", "Stripe"],
      year: "2025",
      tone: "warm"
    },
    {
      name: "[ Projeto 02 ]",
      tagline: { pt: "Dashboard SaaS com analytics em tempo real", en: "SaaS dashboard with real-time analytics" },
      tech: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
      year: "2024",
      tone: "cool"
    },
    {
      name: "[ Projeto 03 ]",
      tagline: { pt: "API REST para app mobile fintech", en: "REST API for fintech mobile app" },
      tech: ["PHP", "Laravel", "Redis", "JWT"],
      year: "2024",
      tone: "neutral"
    },
    {
      name: "[ Projeto 04 ]",
      tagline: { pt: "Site institucional + CMS custom", en: "Corporate site + custom CMS" },
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      year: "2023",
      tone: "warm"
    },
    {
      name: "[ Projeto 05 ]",
      tagline: { pt: "Plataforma de booking com pagamentos", en: "Booking platform with payments" },
      tech: ["Next.js", "Prisma", "PostgreSQL"],
      year: "2023",
      tone: "cool"
    },
    {
      name: "[ Projeto 06 ]",
      tagline: { pt: "Landing page animada com WebGL", en: "Animated landing with WebGL" },
      tech: ["JavaScript", "Three.js", "GSAP"],
      year: "2022",
      tone: "neutral"
    }
  ],

  contacts: {
    email: "ola@fabiodias.dev",
    phone: "+351 XXX XXX XXX",
    github: "github.com/fabiodias",
    linkedin: "linkedin.com/in/fabiodias",
    location: "Lisboa, Portugal"
  },

  ui: {
    pt: {
      nav_work: "Trabalho",
      nav_about: "Sobre",
      nav_stack: "Stack",
      nav_experience: "Experiência",
      nav_contact: "Contacto",
      hero_cta: "Vamos falar",
      hero_cv: "Download CV",
      section_work: "Trabalho selecionado",
      section_work_sub: "Uma seleção de projetos recentes em produção e protótipos.",
      section_stack: "Tecnologias",
      section_stack_sub: "Ferramentas que uso no dia-a-dia.",
      section_about: "Sobre mim",
      section_experience: "Experiência",
      section_education: "Formação",
      section_contact: "Vamos trabalhar juntos",
      section_contact_sub: "Tens um projeto em mente? Diz olá.",
      form_name: "O teu nome",
      form_email: "Email",
      form_subject: "Assunto",
      form_message: "Mensagem",
      form_send: "Enviar mensagem",
      form_sent: "Mensagem enviada ✓",
      footer: "Desenhado e desenvolvido por Fábio Dias",
      available: "Disponível para projetos",
      view_project: "Ver projeto",
      lang_label: "EN",
      cat_frontend: "Frontend",
      cat_backend: "Backend",
      cat_database: "Bases de dados",
      cat_tools: "Ferramentas"
    },
    en: {
      nav_work: "Work",
      nav_about: "About",
      nav_stack: "Stack",
      nav_experience: "Experience",
      nav_contact: "Contact",
      hero_cta: "Let's talk",
      hero_cv: "Download CV",
      section_work: "Selected work",
      section_work_sub: "A selection of recent shipped projects and prototypes.",
      section_stack: "Technologies",
      section_stack_sub: "Tools I use day-to-day.",
      section_about: "About",
      section_experience: "Experience",
      section_education: "Education",
      section_contact: "Let's work together",
      section_contact_sub: "Got a project in mind? Say hi.",
      form_name: "Your name",
      form_email: "Email",
      form_subject: "Subject",
      form_message: "Message",
      form_send: "Send message",
      form_sent: "Message sent ✓",
      footer: "Designed & built by Fábio Dias",
      available: "Open to opportunities",
      view_project: "View project",
      lang_label: "PT",
      cat_frontend: "Frontend",
      cat_backend: "Backend",
      cat_database: "Databases",
      cat_tools: "Tools"
    }
  }
};
