import { describe, expect, it } from "vitest";
import { getSocialAuthMessage, socialAuthProviders } from "./social-auth";

describe("social auth content", () => {
  it("keeps Google active and marks Apple and Facebook as coming soon", () => {
    expect(socialAuthProviders).toEqual([
      { provider: "google", label: "Google", status: "active" },
      { provider: "apple", label: "Apple", status: "soon" },
      { provider: "facebook", label: "Facebook", status: "soon" },
    ]);
  });

  it("explains why social providers are unavailable", () => {
    expect(getSocialAuthMessage("google")).toContain("credenciais do Google");
    expect(getSocialAuthMessage("apple")).toContain("Apple estará disponível em breve");
    expect(getSocialAuthMessage("facebook")).toContain("Facebook estará disponível em breve");
  });
});
