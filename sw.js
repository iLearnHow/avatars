// Service Worker for iLearn Lesson Player
const CACHE_NAME = 'ilearn-v1';
const STATIC_CACHE = 'ilearn-static-v1';
const DYNAMIC_CACHE = 'ilearn-dynamic-v1';

const urlsToCache = [
    '/',
    '/production-lesson-player.html',
    '/complete-lesson-system.js',
    '/smart-lesson-server.js',
    '/assets/avatars/kelly.jpg',
    '/assets/avatars/ken.jpg'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker installed');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleApiRequest(request));
        return;
    }

    // Handle static assets
    if (request.destination === 'image' || 
        request.destination === 'script' || 
        request.destination === 'style' ||
        request.destination === 'document') {
        event.respondWith(handleStaticRequest(request));
        return;
    }

    // Handle other requests
    event.respondWith(handleDynamicRequest(request));
});

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('API request failed, trying cache:', request.url);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline response
        return new Response(
            JSON.stringify({ error: 'Offline mode - please check your connection' }),
            { 
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Handle static requests with cache-first strategy
async function handleStaticRequest(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Static request failed:', request.url);
        return new Response('Offline', { status: 503 });
    }
}

// Handle dynamic requests with network-first strategy
async function handleDynamicRequest(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('Offline', { status: 503 });
    }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Sync any pending user data
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'SYNC_DATA' });
        });
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notifications for lesson reminders
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Time for your daily lesson!',
        icon: '/assets/avatars/kelly.jpg',
        badge: '/assets/avatars/ken.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Start Learning',
                icon: '/assets/avatars/kelly.jpg'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/avatars/ken.jpg'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('iLearn', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Handle message events from main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_LESSON') {
        cacheLesson(event.data.lessonId, event.data.content);
    }
});

// Cache lesson content
async function cacheLesson(lessonId, content) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const response = new Response(JSON.stringify(content), {
            headers: { 'Content-Type': 'application/json' }
        });
        
        await cache.put(`/api/lesson/${lessonId}`, response);
        console.log(`Cached lesson ${lessonId}`);
    } catch (error) {
        console.error('Failed to cache lesson:', error);
    }
} 