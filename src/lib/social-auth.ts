export type SocialProvider = "google" | "facebook" | "apple";
export type SocialProviderStatus = "active";

export const socialAuthProviders: Array<{
  provider: SocialProvider;
  label: string;
  status: SocialProviderStatus;
}> = [
  { provider: "google", label: "Google", status: "active" },
  { provider: "facebook", label: "Facebook", status: "active" },
  { provider: "apple", label: "Apple", status: "active" },
];

export function getSocialAuthMessage(provider: SocialProvider) {
  const labels: Record<SocialProvider, string> = {
    google: "Google",
    facebook: "Facebook",
    apple: "Apple",
  };

  return `Não foi possível abrir o login com ${labels[provider]}. Confirma se as credenciais OAuth deste provedor estão configuradas no Cloudflare.`;
}
