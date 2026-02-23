// Service Worker per BudgetWise
// Cache: Network-first per garantire aggiornamenti rapidi, fallback su cache offline

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

self.addEventListener('install', (event) => {
  console.log('🆕 Service Worker in installazione...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch((err) => console.error('❌ Errore cache install:', err))
  );
});

self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker attivato');
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.map((name) => (name !== CACHE_NAME ? caches.delete(name) : null))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Non gestire schemi non http/https (chrome-extension, file, etc.)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const res = await fetch(req);
        // Cache solo risposte OK e richieste GET
        if (req.method === 'GET' && res && res.ok) {
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
