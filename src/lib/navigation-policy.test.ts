import { describe, expect, it } from "vitest";
import {
  resolveSessionRedirect,
  shouldCacheStaticAsset,
  shouldUseNetworkOnlyForNavigation,
} from "./navigation-policy";

describe("navigation policy", () => {
  it("redirects an authenticated user away from the public landing page", () => {
    expect(resolveSessionRedirect("/", true)).toBe("/app/home");
  });

  it("redirects a guest away from the private app area", () => {
    expect(resolveSessionRedirect("/app/home", false)).toBe("/login");
  });

  it("keeps public auth routes open for guests", () => {
    expect(resolveSessionRedirect("/login", false)).toBeNull();
  });

  it("forces network-only navigation for auth and app routes", () => {
    expect(shouldUseNetworkOnlyForNavigation("/")).toBe(true);
    expect(shouldUseNetworkOnlyForNavigation("/login")).toBe(true);
    expect(shouldUseNetworkOnlyForNavigation("/register")).toBe(true);
    expect(shouldUseNetworkOnlyForNavigation("/app/home")).toBe(true);
  });

  it("caches only static assets in the service worker", () => {
    expect(shouldCacheStaticAsset("/easyclean-logo.png")).toBe(true);
    expect(shouldCacheStaticAsset("/manifest.webmanifest")).toBe(true);
    expect(shouldCacheStaticAsset("/_next/static/chunks/app/page.js")).toBe(true);
    expect(shouldCacheStaticAsset("/login")).toBe(false);
    expect(shouldCacheStaticAsset("/app/home")).toBe(false);
  });
});
