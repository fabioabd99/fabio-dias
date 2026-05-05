import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pt", "en"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Se o caminho já tem um locale válido, não faz nada
  // Ex: /pt/projects/1 → passa direto
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return;

  // Lê o cookie de idioma guardado de visitas anteriores
  // Se não existir, usa português como padrão
  const savedLang = request.cookies.get("lang")?.value;
  const lang = savedLang && locales.includes(savedLang) ? savedLang : "pt";

  // Redireciona para /{lang}{caminho-original}
  // Ex: / → /pt  |  /projects/1 → /pt/projects/1
  request.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Corre em tudo EXCETO: ficheiros internos do Next.js, API routes, favicon e assets estáticos (qualquer path com extensão)
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)" ],
};
