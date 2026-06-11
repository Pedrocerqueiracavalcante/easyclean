import { describe, expect, it } from "vitest";
import { getSocialAuthMessage, socialAuthProviders } from "./social-auth";

describe("social auth content", () => {
  it("keeps Google, Facebook and Apple active", () => {
    expect(socialAuthProviders).toEqual([
      { provider: "google", label: "Google", status: "active" },
      { provider: "facebook", label: "Facebook", status: "active" },
      { provider: "apple", label: "Apple", status: "active" },
    ]);
  });

  it("explains missing OAuth credentials per provider", () => {
    expect(getSocialAuthMessage("google")).toContain("Google");
    expect(getSocialAuthMessage("facebook")).toContain("Facebook");
    expect(getSocialAuthMessage("apple")).toContain("Apple");
    expect(getSocialAuthMessage("apple")).toContain("credenciais OAuth");
  });
});
