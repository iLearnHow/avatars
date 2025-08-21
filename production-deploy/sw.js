// Auto-generated service worker for avatar assets
const CACHE_NAME = 'avatar-cache-v1.0.0';
const CDN_BASE = 'https://ilearnhow.com/assets/avatars';

// Critical assets to cache immediately
const CRITICAL_ASSETS = [
  "https://ilearnhow.com/assets/avatars/kelly/base-states/kelly_neutral_default.png",
  "https://ilearnhow.com/assets/avatars/kelly/emotional-expressions/kelly_concerned_thinking.png",
  "https://ilearnhow.com/assets/avatars/kelly/emotional-expressions/kelly_happy_celebrating.png",
  "https://ilearnhow.com/assets/avatars/kelly/kelly_neutral_default.png",
  "https://ilearnhow.com/assets/avatars/kelly/lesson-sequence/kelly_question_curious.png",
  "https://ilearnhow.com/assets/avatars/kelly/lesson-sequence/kelly_teaching_explaining.png",
  "https://ilearnhow.com/assets/avatars/kelly/optimized/base-states/kelly_neutral_default.png",
  "https://ilearnhow.com/assets/avatars/kelly/optimized/emotional-expressions/kelly_concerned_thinking.png",
  "https://ilearnhow.com/assets/avatars/kelly/optimized/emotional-expressions/kelly_happy_celebrating.png",
  "https://ilearnhow.com/assets/avatars/kelly/optimized/lesson-sequence/kelly_question_curious.png",
  "https://ilearnhow.com/assets/avatars/kelly/optimized/lesson-sequence/kelly_teaching_explaining.png",
  "https://ilearnhow.com/assets/avatars/ken/base-states/ken_neutral_default.png",
  "https://ilearnhow.com/assets/avatars/ken/emotional-expressions/ken_concerned_thinking.png",
  "https://ilearnhow.com/assets/avatars/ken/emotional-expressions/ken_happy_celebrating.png",
  "https://ilearnhow.com/assets/avatars/ken/ken_neutral_default.png",
  "https://ilearnhow.com/assets/avatars/ken/lesson-sequence/ken_question_curious.png",
  "https://ilearnhow.com/assets/avatars/ken/lesson-sequence/ken_teaching_explaining.png"
];

// Install event - cache critical assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching critical avatar assets...');
            return cache.addAll(CRITICAL_ASSETS);
        })
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name.startsWith('avatar-cache-') && name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    if (event.request.url.includes('/assets/avatars/')) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    // Cache successful responses
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    }
});