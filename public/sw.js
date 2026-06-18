const CACHE_NAME = "easyclean-mobile-v2";
const STATIC_ASSETS = [
  "/manifest.webmanifest",
  "/app-icon.svg",
  "/easyclean-logo.png",
  "/easyclean-hero-bg.png"
];

function shouldUseNetworkOnlyForNavigation() {
  return true;
}

function shouldCacheStaticAsset(pathname) {
  if (pathname.startsWith("/_next/static/")) {
    return true;
  }

  return STATIC_ASSETS.includes(pathname);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    if (shouldUseNetworkOnlyForNavigation(url.pathname)) {
      return;
    }
    return;
  }

  if (!shouldCacheStaticAsset(url.pathname)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;

        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    })
  );
});
