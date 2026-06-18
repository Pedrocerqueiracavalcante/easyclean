const publicAuthRoutes = new Set([
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
]);

export function resolveSessionRedirect(pathname: string, hasSession: boolean) {
  if (hasSession && publicAuthRoutes.has(pathname)) {
    return "/app/home";
  }

  if (!hasSession && pathname.startsWith("/app")) {
    return "/login";
  }

  return null;
}

export function shouldUseNetworkOnlyForNavigation() {
  return true;
}

export function shouldCacheStaticAsset(pathname: string) {
  if (pathname.startsWith("/_next/static/")) {
    return true;
  }

  return [
    "/manifest.webmanifest",
    "/app-icon.svg",
    "/easyclean-logo.png",
    "/easyclean-hero-bg.png",
    "/social-facebook.png",
    "/social-instagram.png",
    "/social-linkedin.png",
    "/icone-whatsapp.png",
    "/whatsapp-clean.png",
  ].includes(pathname);
}
