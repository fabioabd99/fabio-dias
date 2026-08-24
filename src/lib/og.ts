import { readFileSync } from "node:fs";
import { join } from "node:path";

// Dimensões que o Facebook, LinkedIn, WhatsApp e X esperam num cartão grande.
export const OG_SIZE = { width: 1200, height: 630 };

// Os mesmos tokens do globals.css — o cartão tem de parecer o site.
export const OG = {
  bg: "#f4f1ea",
  ink: "#0a0a0a",
  accent: "#ff5b22",
} as const;

// A fonte vive no repositório em vez de ser descarregada no build: o Satori
// precisa dos bytes, e ir buscá-los ao Google durante o build significava que
// uma falha de rede partia o deploy. A Archivo Black é OFL, pode ser
// redistribuída. É TTF e não WOFF2 porque o Satori não lê WOFF2.
let cached: Buffer | null = null;

export function displayFont(): Buffer {
  cached ??= readFileSync(
    join(process.cwd(), "src/assets/ArchivoBlack-Regular.ttf")
  );
  return cached;
}

// Uma só família registada, portanto tudo no cartão a usa. As etiquetas
// pequenas compensam o peso com letter-spacing largo, como no site.
export function ogFonts() {
  return [
    { name: "Archivo", data: displayFont(), weight: 400 as const, style: "normal" as const },
  ];
}
