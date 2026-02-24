/**
 * The cache name should change every time you want to "cache bust"
 * Bump this when static assets change.
 */
const CACHE_NAME = "rf-cache-v1.0.4";

/**
 * ONLY these files will ever be cached.
 */
const urlsToCache = [
  "/static/style.css",
  "/static/station.jpg",
  "/static/logo.png",
];

/**
 * Install: cache static assets
 */
self.addEventListener("install", (event) => {
  console.log("Service Worker installing");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

/**
 * Activate: remove old caches
 */
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating");

  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

/**
 * Fetch:
 * - Pages (navigation): always network
 * - Explicit static assets: cache-first
 * - Everything else (API, media, streams): network only
 */
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Always fetch pages from network
  if (request.mode === "navigate") {
    event.respondWith(fetch(request));
    return;
  }

  // Only cache explicitly listed static assets
  if (urlsToCache.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;

          return fetch(request).then((response) => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Everything else: network only, never cached
  event.respondWith(fetch(request));
});