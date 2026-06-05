"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { isValidEmail } from "@/lib/email-validation";
import {
  getSocialAuthMessage,
  socialAuthProviders,
  type SocialProvider,
} from "@/lib/social-auth";

const rememberedEmailKey = "easyclean:remembered-email";

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
    return <Apple className="h-6 w-6 text-gray-900" aria-hidden="true" />;
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(rememberedEmailKey) ?? "";
  });
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<SocialProvider | "">("");
  const [message, setMessage] = useState("");

  function handleEmailChange(value: string) {
    setEmail(value);
    const normalizedEmail = value.trim().toLowerCase();
    if (isValidEmail(normalizedEmail)) {
      window.localStorage.setItem(rememberedEmailKey, normalizedEmail);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    setLoading(true);
    setMessage("");
    try {
      await signIn.email({ email: normalizedEmail, password });
      window.localStorage.setItem(rememberedEmailKey, normalizedEmail);
      router.push("/app/home");
    } catch {
      setMessage("Email ou senha inválidos. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: SocialProvider) {
    setMessage("");

    if (provider !== "google") {
      setMessage(getSocialAuthMessage(provider));
      return;
    }

    setSocialLoading(provider);
    try {
      const response = await signIn.social({
        provider: "google",
        callbackURL: "/app/home",
        disableRedirect: true,
      });
      if (response.data?.url) {
        window.location.assign(response.data.url);
        return;
      }
      setMessage(getSocialAuthMessage("google"));
      setSocialLoading("");
    } catch {
      setMessage(getSocialAuthMessage("google"));
      setSocialLoading("");
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-[#dbe8d4] bg-white p-8 shadow-xl shadow-[#2d6a2d]/8">
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
        <p className="mt-1 text-sm text-gray-500">Entra na tua conta Easy Clean.</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {socialAuthProviders.map((item) => (
            <button
              key={item.provider}
              type="button"
              onClick={() => handleSocial(item.provider)}
              aria-label={`Continuar com ${item.label}`}
              disabled={socialLoading === item.provider}
              className="group relative flex h-20 flex-col items-center justify-center gap-1 rounded-2xl border border-[#d9e6d5] bg-white text-xs font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2D6A2D] hover:shadow-md disabled:opacity-60"
            >
              {item.status === "soon" && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-[#eef8e8] px-1.5 py-0.5 text-[9px] font-bold uppercase text-[#2D6A2D]">
                  Em breve
                </span>
              )}
              <SocialIcon provider={item.provider} />
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs leading-5 text-gray-400">
          Google será ativado assim que as credenciais OAuth forem configuradas.
        </p>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#e2e8df]" />
          <span className="text-xs text-gray-400">ou entra com email</span>
          <div className="h-px flex-1 bg-[#e2e8df]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nome@email.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
          />
          <Input
            label="Senha"
            type="password"
            autoComplete="current-password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-xs text-gray-400">O email válido fica salvo automaticamente neste dispositivo.</p>
          {message && (
            <div className="rounded-xl border border-[#dbe8d4] bg-[#f7fbf4] px-4 py-3 text-sm leading-5 text-[#245f2f]">
              {message}
            </div>
          )}
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-[#2D6A2D] hover:underline">
              Esqueceste a senha?
            </Link>
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            Entrar
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm text-gray-500">
        Não tens conta?{" "}
        <Link href="/register" className="font-semibold text-[#2D6A2D] hover:underline">
          Regista-te grátis
        </Link>
      </p>
    </div>
  );
}
