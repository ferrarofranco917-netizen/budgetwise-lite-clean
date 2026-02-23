// Service Worker per BudgetWise - v4 (pulito)
const CACHE_NAME = "budgetwise-v4";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// Install
self.addEventListener("install", (event) => {
  console.log("🆕 Service Worker in installazione...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => console.error("❌ Errore cache install:", err))
  );
});

// Activate + cleanup vecchie cache
self.addEventListener("activate", (event) => {
  console.log("⚡ Service Worker attivato");
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.map((n) => (n !== CACHE_NAME ? caches.delete(n) : null)))
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: Network First, fallback cache
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ NON toccare richieste non http/https (chrome-extension, file, ecc.)
  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // ✅ Evita di cache-are richieste non-GET (POST, ecc.)
  if (req.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const res = await fetch(req);

        // Cache solo risposte OK
        if (res && res.ok) {
          cache.put(req, res.clone()).catch(() => {});
        }

        return res;
      } catch (err) {
        const cached = await cache.match(req);
        if (cached) return cached;
        throw err;
      }
    })()
  );
});
