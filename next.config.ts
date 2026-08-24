import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// O guia de CSP do Next usa nonce gerado no proxy, mas isso obriga a render
// dinâmico e este site é todo pré-renderizado — perderíamos o SSG das 6 páginas
// por um ganho que aqui não existe, já que não há conteúdo de terceiros.
// Daí uma política fixa.
//
// 'unsafe-inline' em script-src é inevitável sem nonce: o Next injeta os
// scripts de hidratação inline. A política continua a valer — bloqueia
// origens externas de script, embedding, plugins e mudança de <base>.
//
// 'unsafe-eval' só em desenvolvimento, onde o React usa eval para reconstruir
// stacks de erro. Em produção nem o React nem o Next precisam dele.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // Os componentes usam style={{...}}, que gera atributos style inline.
  "style-src 'self' 'unsafe-inline'",
  // data: e blob: para as imagens que o next/image gera.
  "img-src 'self' data: blob:",
  // next/font/google descarrega as fontes no build e serve-as de /_next/static.
  "font-src 'self'",
  // O formulário de contacto faz fetch para a própria origem.
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // frame-ancestors já cobre isto nos browsers modernos; fica para os antigos.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Sem 'preload': entrar na lista de preload dos browsers é difícil de
  // reverter e é uma decisão que não deve ser tomada de passagem.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  // Deixa de anunciar a framework em cada resposta.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
