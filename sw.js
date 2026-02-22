const CACHE_NAME = 'budgetwise-v6'; // CAMBIA NUMERO
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    '/icon-192.png',
    '/icon-512.png'
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
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request);
            })
    );
});



