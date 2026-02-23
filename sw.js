// BudgetWise Service Worker - Production Safe
// Works for browser + installed PWA (GitHub Pages friendly)

const CACHE_VERSION = "v5";                 // <- aumenta a v6, v7... ad ogni release
const CACHE_NAME = `budgetwise-${CACHE_VERSION}`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// Utility: cache only same-origin http(s)
function isCacheableRequest(request) {
  try {
    const url = new URL(request.url);

    // Only http/https
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;

    // Only same-origin (avoid cdn/fonts/chrome-extension/etc.)
    if (url.origin !== self.location.origin) return false;

    // Only GET
    if (request.method !== "GET") return false;

    return true;
  } catch {
    return false;
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CORE_ASSETS);
      await self.skipWaiting();
    })().catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Remove old caches
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => (k.startsWith("budgetwise-") && k !== CACHE_NAME ? caches.delete(k) : null))
      );

      await self.clients.claim();
    })().catch(() => {})
  );
});

// Strategy:
// - CORE assets: Stale-While-Revalidate (fast, updates in background)
// - Other same-origin GET: Network-First fallback cache
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (!isCacheableRequest(req)) return;

  const url = new URL(req.url);
  const path = url.pathname.split("/").pop() || "./";
  const isCore = CORE_ASSETS.includes("./" + path) || CORE_ASSETS.includes(url.pathname) || url.pathname.endsWith("/");

  if (isCore) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(req);

        // Update in background
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => null);

        return cached || (await fetchPromise) || new Response("Offline", { status: 503 });
      })()
    );
    return;
  }

  // Network First for other requests
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const res = await fetch(req);
        if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
        return res;
      } catch {
        const cached = await cache.match(req);
        if (cached) return cached;
        return new Response("Offline", { status: 503 });
      }
    })()
  );
});

// Optional: allow page to request immediate activation
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting().catch(() => {});
  }
});
