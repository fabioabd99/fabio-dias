import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Força runtime Node.js (nodemailer não corre em edge) e dá mais margem ao Vercel
// para terminar o handshake SMTP do Gmail — antes ficava a 10s e fazia 504.
export const runtime = "nodejs";
export const maxDuration = 30;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  // Reutiliza conexões entre invocações na mesma instância — evita handshake repetido.
  pool: true,
  maxConnections: 1,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
});

// ─── Limites ──────────────────────────────────────────────────────────────────

// Comprimento máximo por campo. Antes só `message` tinha limite, portanto um
// `name` de 1MB era aceite e entrava no assunto do email.
const MAX = {
  name: 100,
  email: 150,
  subject: 200,
  message: 5000,
} as const;

// Teto ao corpo inteiro, verificado antes de fazer parse do JSON: sem isto,
// um payload de vários MB é lido para memória só para ser rejeitado a seguir.
const MAX_BODY_BYTES = 32 * 1024;

// Janela de rate limiting por IP. Conta TODOS os pedidos, não só os que chegam
// a enviar email — senão um bot podia disparar lixo sem limite. Daí 5 e não 2:
// deixa margem para alguém tentar de novo depois de uma falha de SMTP, sem
// deixar de travar o envio em massa.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// ─── Rate limiting ────────────────────────────────────────────────────────────

// Em memória, por instância. Numa app com muitas instâncias isto seria
// insuficiente e precisaria de Vercel KV ou Upstash — mas para o volume de um
// portefólio, e como a Vercel reutiliza instâncias quentes, trava a esmagadora
// maioria do abuso automatizado sem acrescentar infraestrutura.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Impede o Map de crescer sem limite numa instância de vida longa.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(req: Request): string {
  // Na Vercel o primeiro valor de x-forwarded-for é o cliente real.
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ─── Validação ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devolve a string limpa, ou null se o valor não for utilizável.
// A verificação de tipo é o ponto central: antes, um `message` numérico passava
// porque `undefined > 5000` é falso, e um objeto virava "[object Object]".
function str(value: unknown, max: number, required: boolean): string | null {
  if (value === undefined || value === null) return required ? null : "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (required && trimmed.length === 0) return null;
  if (trimmed.length > max) return null;
  return trimmed;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: { "Retry-After": String(RATE_LIMIT.windowMs / 1000) } }
      );
    }

    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const input = body as Record<string, unknown>;

    // Honeypot: o campo está escondido no formulário, portanto uma pessoa nunca
    // o preenche. Responde 200 de propósito — um bot que veja 400 tenta outra
    // vez, um que veja sucesso segue caminho.
    if (typeof input.website === "string" && input.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = str(input.name, MAX.name, true);
    const email = str(input.email, MAX.email, true);
    const subject = str(input.subject, MAX.subject, false);
    const message = str(input.message, MAX.message, true);

    if (name === null || email === null || message === null || subject === null) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: safeSubject ? `[Portfolio] ${safeSubject}` : `[Portfolio] Mensagem de ${safeName}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr/>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
