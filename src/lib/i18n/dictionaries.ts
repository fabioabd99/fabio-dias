import "server-only";

// Os dois idiomas suportados
export type Locale = "pt" | "en";

// Type guard — verifica se uma string é um Locale válido
// Usado nas pages para validar o parâmetro [lang] da URL
export function hasLocale(lang: string): lang is Locale {
  return lang === "pt" || lang === "en";
}

// Carrega o ficheiro JSON do idioma pedido
// O import() dinâmico garante que só um ficheiro é carregado por pedido
export async function getDictionary(lang: Locale) {
  return (await import(`./${lang}.json`)).default;
}
