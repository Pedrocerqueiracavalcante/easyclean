"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          redirectTo: "/reset-password",
        }),
      });

      if (!res.ok) {
        throw new Error("Não foi possível enviar o email de recuperação.");
      }

      setSent(true);
      setMessage("Se este email estiver registado, enviámos um link para redefinir a senha.");
    } catch {
      setMessage("Não foi possível enviar agora. Tenta novamente em alguns minutos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-[#dbe8d4] bg-white p-8 shadow-xl shadow-[#2d6a2d]/8">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2D6A2D]">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao login
        </Link>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef8e8] text-[#2D6A2D]">
          <MailCheck className="h-7 w-7" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Escreve o email da conta. Vamos enviar um link seguro para criares uma nova senha.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {message && (
            <div className={`rounded-xl border px-4 py-3 text-sm leading-5 ${sent ? "border-[#dbe8d4] bg-[#f7fbf4] text-[#245f2f]" : "border-red-100 bg-red-50 text-red-600"}`}>
              {message}
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            Enviar link de recuperação
          </Button>
        </form>
      </div>
    </div>
  );
}
