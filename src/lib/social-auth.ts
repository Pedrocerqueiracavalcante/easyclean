export type SocialProvider = "google" | "apple" | "facebook";
export type SocialProviderStatus = "active" | "soon";

export const socialAuthProviders: Array<{
  provider: SocialProvider;
  label: string;
  status: SocialProviderStatus;
}> = [
  { provider: "google", label: "Google", status: "active" },
  { provider: "apple", label: "Apple", status: "soon" },
  { provider: "facebook", label: "Facebook", status: "soon" },
];

export function getSocialAuthMessage(provider: SocialProvider) {
  if (provider === "google") {
    return "O login com Google está preparado, mas ainda precisa das credenciais do Google configuradas no Cloudflare.";
  }

  if (provider === "apple") {
    return "Login com Apple estará disponível em breve. Usa email ou Google por enquanto.";
  }

  return "Login com Facebook estará disponível em breve. Usa email ou Google por enquanto.";
}
