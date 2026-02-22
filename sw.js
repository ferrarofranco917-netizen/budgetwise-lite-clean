const CACHE_NAME = 'budgetwise-v4';
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
    console.log('🆕 Service Worker in installazione...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('✅ Cache aperta');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Cache popolata');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Errore cache:', error);
            })
    );
});

// Attivazione e pulizia cache vecchie
self.addEventListener('activate', event => {
    console.log('⚡ Service Worker attivato');
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
    // Ignora richieste non GET
    if (event.request.method !== 'GET') return;

    // Gestisci richieste di navigazione (pagine HTML)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache della risposta
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // Se offline, mostra splash.html
                    return caches.match('/splash.html');
                })
        );
        return;
    }

    // Per altre risorse (CSS, JS, immagini)
    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Se la richiesta ha successo, la mettiamo in cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Se offline, cerca nella cache
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // Se non trovi nulla nella cache, ritorna un errore
                    return new Response('Offline', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});

// Gestione push notifications (opzionale)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Nuovo messaggio',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Apri BudgetWise'
            },
            {
                action: 'close',
                title: 'Chiudi'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('BudgetWise', options)
    );
});

// Click su notifiche
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});


