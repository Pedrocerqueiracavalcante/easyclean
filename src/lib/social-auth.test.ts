import { describe, expect, it } from "vitest";
import { getSocialAuthMessage, socialAuthProviders } from "./social-auth";

describe("social auth content", () => {
  it("keeps Google active and marks other providers as coming soon", () => {
    expect(socialAuthProviders).toEqual([
      { provider: "google", label: "Google", status: "active" },
      { provider: "facebook", label: "Facebook", status: "soon" },
      { provider: "apple", label: "Apple", status: "soon" },
    ]);
  });

  it("uses a simple customer-facing error message", () => {
    expect(getSocialAuthMessage("google")).toContain("Google");
    expect(getSocialAuthMessage("facebook")).toContain("Facebook");
    expect(getSocialAuthMessage("apple")).toContain("Apple");
    expect(getSocialAuthMessage("apple")).toContain("Tenta novamente");
  });
});
