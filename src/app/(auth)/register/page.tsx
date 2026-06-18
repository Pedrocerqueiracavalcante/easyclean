"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signUp } from "@/lib/auth-client";
import {
  getSocialAuthMessage,
  socialAuthProviders,
  type SocialProvider,
} from "@/lib/social-auth";

function SocialIcon({ provider }: { provider: SocialProvider }) {
  if (provider === "google") {
    return (
      <svg width="24" height="24" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
        <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
        <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z" />
        <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
      </svg>
    );
  }

  if (provider === "apple") {
    return <Apple className="h-6 w-6 text-gray-500" aria-hidden="true" />;
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path
        fill="#fff"
        d="M14.9 12.7h-1.9v6.1h-2.6v-6.1H9.1v-2.2h1.3V9.1c0-1 .5-2.7 2.8-2.7h2v2.2h-1.5c-.2 0-.7.1-.7.7v1.2h2.1l-.2 2.2Z"
      />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | "">("");
  const [message, setMessage] = useState("");

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalizedEmail = form.email.trim().toLowerCase();

    if (form.password.length < 8) {
      setMessage("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await signUp.email({
        name: form.name.trim(),
        email: normalizedEmail,
        password: form.password,
      });
      if (response.error) {
        setMessage("Não foi possível criar a conta. O email já pode estar em uso.");
        return;
      }
      router.push("/onboarding");
    } catch {
      setMessage("Não foi possível criar a conta. O email já pode estar em uso.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: SocialProvider) {
    const socialProvider = socialAuthProviders.find((item) => item.provider === provider);
    if (socialProvider?.status !== "active") {
      setMessage(`${socialProvider?.label ?? "Este login"} estará disponível em breve.`);
      return;
    }

    setMessage("");
    setSocialLoading(provider);

    try {
      const response = await signIn.social({
        provider,
        callbackURL: "/onboarding",
        disableRedirect: true,
      });
      if (response.data?.url) {
        window.location.assign(response.data.url);
        return;
      }
      setMessage(getSocialAuthMessage(provider));
      setSocialLoading("");
    } catch {
      setMessage(getSocialAuthMessage(provider));
      setSocialLoading("");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-[#dbe8d4] bg-white p-6 shadow-xl shadow-[#2d6a2d]/8 sm:p-8">
        <h1 className="text-2xl font-black text-gray-900">Criar conta</h1>
        <p className="mt-1 text-sm text-gray-500">Agenda e acompanha tudo online.</p>

        <div className="mt-7 space-y-3">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            disabled={socialLoading === "google"}
            className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[#d9e6d5] bg-white text-sm font-black text-gray-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D6A2D] hover:shadow-md disabled:opacity-60"
          >
            <SocialIcon provider="google" />
            {socialLoading === "google" ? "Abrindo Google..." : "Continuar com Google"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            {socialAuthProviders
              .filter((item) => item.provider !== "google")
              .map((item) => (
                <button
                  key={item.provider}
                  type="button"
                  onClick={() => handleSocial(item.provider)}
                  aria-label={`Continuar com ${item.label}`}
                  disabled={item.status !== "active" || socialLoading === item.provider}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#e2e8df] bg-[#fbfdf9] text-xs font-bold text-gray-400 shadow-sm disabled:cursor-not-allowed disabled:opacity-75"
                >
                  <SocialIcon provider={item.provider} />
                  {item.label}
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-gray-400">em breve</span>
                </button>
              ))}
          </div>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e2e8df]" />
          <span className="text-xs text-gray-400">ou usa email</span>
          <div className="h-px flex-1 bg-[#e2e8df]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nome" placeholder="Maria Santos" value={form.name} onChange={set("name")} required />
          <Input
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="maria@email.com"
            value={form.email}
            onChange={set("email")}
            required
          />
          <Input label="Telefone" type="tel" placeholder="+352 621 000 000" value={form.phone} onChange={set("phone")} />
          <Input label="Senha" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={set("password")} required />

          {message ? (
            <div className="rounded-xl border border-[#dbe8d4] bg-[#f7fbf4] px-4 py-3 text-sm leading-5 text-[#245f2f]">
              {message}
            </div>
          ) : null}

          <Button type="submit" className="w-full" loading={loading}>
            Criar conta
          </Button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          Ao continuar, aceitas os{" "}
          <Link href="/termos" className="text-[#2D6A2D] hover:underline">Termos</Link>{" "}
          e a{" "}
          <Link href="/privacidade" className="text-[#2D6A2D] hover:underline">Privacidade</Link>.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Já tens conta?{" "}
        <Link href="/login" className="font-semibold text-[#2D6A2D] hover:underline">Entrar</Link>
      </p>
    </div>
  );
}
