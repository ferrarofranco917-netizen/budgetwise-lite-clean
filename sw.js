const CACHE_NAME = 'budgetwise-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/splash.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    '/icon-192.png',
    '/icon-512.png',
    // iOS splash screens (se presenti)
    '/splash/apple-splash-2048.png',
    '/splash/apple-splash-1668.png',
    '/splash/apple-splash-1536.png',
    '/splash/apple-splash-1242.png',
    '/splash/apple-splash-1125.png',
    '/splash/apple-splash-1334.png',
    '/splash/apple-splash-2436.png',
    '/splash/apple-splash-2688.png',
    '/splash/apple-splash-1792.png'
];

// Installazione
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aperta');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Attivazione e pulizia cache vecchie
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Cache vecchia rimossa:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Strategia di fetch: Network First, fallback su cache
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    if (event.request.mode === 'navigate') {
                        return caches.match('/splash.html');
                    }
                    
                    return new Response('Offline', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            })
    );
});

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
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
                title: 'Vedi dettagli'
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




