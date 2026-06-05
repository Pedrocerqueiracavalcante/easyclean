"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const error = searchParams.get("error") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("Link inválido ou expirado. Pede uma nova recuperação de senha.");
      return;
    }

    if (password.length < 8) {
      setMessage("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!res.ok) {
        throw new Error("Não foi possível redefinir a senha.");
      }

      setSuccess(true);
      setMessage("Senha atualizada com sucesso. Já podes entrar com a nova senha.");
    } catch {
      setMessage("Link inválido ou expirado. Pede uma nova recuperação de senha.");
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
          <LockKeyhole className="h-7 w-7" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Criar nova senha</h1>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Define uma senha nova para voltar a entrar na Easy Clean.
        </p>

        {error ? (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            Link inválido ou expirado. Pede uma nova recuperação de senha.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Nova senha"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirmar senha"
            type="password"
            autoComplete="new-password"
            placeholder="Repete a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {message && (
            <div className={`rounded-xl border px-4 py-3 text-sm leading-5 ${success ? "border-[#dbe8d4] bg-[#f7fbf4] text-[#245f2f]" : "border-red-100 bg-red-50 text-red-600"}`}>
              {message}
            </div>
          )}

          {success ? (
            <Link href="/login" className="block">
              <Button type="button" className="w-full">
                Entrar no login
              </Button>
            </Link>
          ) : (
            <Button type="submit" className="w-full" loading={loading}>
              Atualizar senha
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-sm text-gray-500">A carregar recuperação de senha...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
