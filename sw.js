// Service Worker per BudgetWise - v3
const CACHE_NAME = 'budgetwise-v4';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// Installazione
self.addEventListener('install', event => {
    console.log('🆕 Service Worker v3 in installazione...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache v3 aperta');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Cache v3 popolata');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Errore cache:', error);
            })
    );
});

// Attivazione e pulizia cache vecchie
self.addEventListener('activate', event => {
    console.log('⚡ Service Worker v3 attivato');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Cache vecchia rimossa:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Cache pulita, prendo controllo');
            return self.clients.claim();
        })
    );
});

// Strategia di fetch: Network First, fallback su cache
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // ✅ Non gestire richieste non GET
  if (req.method !== "GET") return;

  // ✅ Ignora schemi non supportati (chrome-extension, moz-extension, file, etc.)
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  // ✅ Cache solo risorse della tua app (same-origin)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((res) => {
          // ✅ non cachare risposte non valide
          if (!res || res.status !== 200 || res.type !== "basic") return res;

          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match("./index.html")); // opzionale fallback offline
    })
  );
});
