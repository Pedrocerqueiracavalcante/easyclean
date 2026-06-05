"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp, signIn } from "@/lib/auth-client";

type SocialProvider = "google" | "apple" | "facebook";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | "">("");
  const [error, setError] = useState("");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await signUp.email({ name: form.name, email: form.email, password: form.password });
      router.push("/onboarding");
    } catch {
      setError("Erro ao criar conta. O email já pode estar em uso.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: SocialProvider) {
    setError("");

    if (provider !== "google") {
      setError("Este login social ainda precisa ser configurado. Usa Google ou email por enquanto.");
      return;
    }

    setSocialLoading(provider);
    try {
      const response = await signIn.social({
        provider: "google",
        callbackURL: "/onboarding",
        disableRedirect: true,
      });
      if (response.data?.url) {
        window.location.href = response.data.url;
        return;
      }
      setError("Não foi possível abrir o login com Google. Verifica a configuração do provedor.");
      setSocialLoading("");
    } catch {
      setError("Não foi possível abrir o login com Google. Verifica a configuração do provedor.");
      setSocialLoading("");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl border border-[#e2e8df] shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Criar conta</h1>
        <p className="text-sm text-gray-500 mb-8">Grátis para começar, sem cartão necessário</p>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            aria-label="Continuar com Google"
            disabled={socialLoading === "google"}
            className="group flex h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-[#d9e6d5] bg-white text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D6A2D] hover:shadow-md disabled:opacity-60"
          >
            <svg width="24" height="24" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z" />
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocial("apple")}
            aria-label="Continuar com Apple"
            className="group flex h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-[#d9e6d5] bg-[#fbfdf9] text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D6A2D] hover:shadow-md"
          >
            <span className="text-2xl leading-none" aria-hidden="true">A</span>
            Apple
          </button>
          <button
            type="button"
            onClick={() => handleSocial("facebook")}
            aria-label="Continuar com Facebook"
            className="group flex h-16 flex-col items-center justify-center gap-1 rounded-2xl border border-[#d9e6d5] bg-[#fbfdf9] text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D6A2D] hover:shadow-md"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-base font-bold text-white" aria-hidden="true">f</span>
            Facebook
          </button>
        </div>
        <p className="mb-6 text-center text-xs text-gray-400">
          Google abre a tela oficial de login. Apple e Facebook ficam prontos para ativação.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[#e2e8df]" />
          <span className="text-xs text-gray-400">ou</span>
          <div className="flex-1 h-px bg-[#e2e8df]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome completo" placeholder="Maria Santos" value={form.name} onChange={set("name")} required />
          <Input label="Email" type="email" placeholder="maria@email.com" value={form.email} onChange={set("email")} required />
          <Input label="Telefone" type="tel" placeholder="+352 621 000 000" value={form.phone} onChange={set("phone")} />
          <Input label="Senha" type="password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={set("password")} required />
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          <Button type="submit" className="w-full" loading={loading}>
            Criar conta grátis
          </Button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Ao registares-te, aceitas os{" "}
          <Link href="/termos" className="text-[#2D6A2D] hover:underline">Termos de Serviço</Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="text-[#2D6A2D] hover:underline">Política de Privacidade</Link>.
        </p>
      </div>
      <p className="text-center text-sm text-gray-500 mt-6">
        Já tens conta?{" "}
        <Link href="/login" className="text-[#2D6A2D] font-semibold hover:underline">Entrar</Link>
      </p>
    </div>
  );
}
