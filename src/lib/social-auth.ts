export type SocialProvider = "google" | "facebook" | "apple";
export type SocialProviderStatus = "active" | "soon";

export const socialAuthProviders: Array<{
  provider: SocialProvider;
  label: string;
  status: SocialProviderStatus;
}> = [
  { provider: "google", label: "Google", status: "active" },
  { provider: "facebook", label: "Facebook", status: "soon" },
  { provider: "apple", label: "Apple", status: "soon" },
];

export function getSocialAuthMessage(provider: SocialProvider) {
  const labels: Record<SocialProvider, string> = {
    google: "Google",
    facebook: "Facebook",
    apple: "Apple",
  };

  return `Não foi possível abrir o login com ${labels[provider]}. Tenta novamente em alguns instantes.`;
}
