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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const safeName    = escapeHtml(String(name));
    const safeEmail   = escapeHtml(String(email));
    const safeSubject = escapeHtml(String(subject ?? ""));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, "<br/>");

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: String(email),
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
