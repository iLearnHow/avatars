
const CACHE_NAME = 'ilearnhow-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/complete-curriculum.js',
    '/corrected-variant-generator-v2.js',
    '/complete-elevenlabs-integration.js',
    '/apple-quality-overlay-system.js',
    '/ai-generation-integration.js',
    '/assets/avatars/kelly/kelly_neutral_default.png',
    '/assets/avatars/ken/ken_neutral_default.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
