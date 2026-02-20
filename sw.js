const CACHE = "bw-lite-v8"; // <-- aumenta versione
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./sw.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // ✅ IMPORTANTISSIMO: per le navigazioni (apertura app / refresh / routing)
  // vai SEMPRE in rete -> così prendi l’index nuovo e la data corretta.
  if (req.method === "GET" && req.mode === "navigate") {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(()=>{});
          return resp;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // default: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(()=>{});
        return resp;
      }).catch(() => cached);
    })
  );
});




