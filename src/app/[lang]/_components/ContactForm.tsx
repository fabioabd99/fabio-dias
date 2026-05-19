"use client";

import { useState } from "react";

interface FormDict {
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
}

interface Props {
  dict: FormDict;
}

type Status = "idle" | "sending" | "success" | "error";

// Classe base dos inputs/textarea — copiada do CSS do design:
// border-bottom 1.5px rgba(white, 0.3), sem border noutros lados,
// fundo transparente, focus muda border para accent
const fieldBase =
  "w-full bg-transparent border-0 outline-none text-bg text-[18px] py-2.5 transition-colors duration-250" +
  " [border-bottom:1.5px_solid_rgba(255,255,255,0.3)] focus:[border-bottom-color:var(--color-accent)]";

export default function ContactForm({ dict }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  function clearError() {
    if (status === "error") setStatus("idle");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // Captura referência ao form ANTES do await — e.currentTarget é null depois.
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} onChange={clearError} className="flex flex-col gap-5">

      <Field id="cf-name" label={dict.name}>
        <input id="cf-name" name="name" type="text" required className={fieldBase} />
      </Field>

      <Field id="cf-email" label={dict.email}>
        <input id="cf-email" name="email" type="email" required className={fieldBase} />
      </Field>

      <Field id="cf-subject" label={dict.subject}>
        <input id="cf-subject" name="subject" type="text" className={fieldBase} />
      </Field>

      <Field id="cf-message" label={dict.message}>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          className={`${fieldBase} resize-y min-h-25`}
        />
      </Field>

      {/* Botão: fundo accent, texto escuro (ink), hover: desloca + sombra creme */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 self-start inline-flex items-center gap-3 bg-accent text-ink uppercase tracking-wider text-[16px] px-7 py-4.5 transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-bg)] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        {status === "sending" ? dict.sending : dict.send}
        <span aria-hidden="true">→</span>
      </button>

      {/* Sucesso: div abaixo do botão (não substitui o form) */}
      {status === "success" && (
        <div
          role="status"
          className="bg-accent text-ink px-4 py-4 text-[13px]"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          {dict.success}
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-accent text-[13px]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          {dict.error}
        </p>
      )}
    </form>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
// Apenas label + slot para o input — sem flex-col extra porque o gap do form
// já espaça tudo.

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] uppercase tracking-widest opacity-60 mb-1.5"
        style={{ fontFamily: "var(--font-jetbrains)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
