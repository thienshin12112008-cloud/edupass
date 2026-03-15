// EduPass Service Worker
const CACHE_NAME = 'edupass-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/tai-lieu.html',
  '/luyen-thi.html',
  '/tao-de-thi.html',
  '/dang-nhap.html',
  '/dang-ky.html',
  '/tai-khoan.html',
  '/cau-chuyen.html',
  '/hanh-trinh-edupass.html',
  '/lam-bai-thi.html',
  '/styles.css',
  '/script.js',
  '/edupass-ai.css',
  '/edupass-ai.js',
  '/tao-de-thi.css',
  '/tao-de-thi.js',
  '/logo.png',
  '/manifest.json',
  '/assets/ai-logo.png',
  '/assets/logo3.png',
  '/images/favicon.ico'
];

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).catch(err => console.log('Cache install error:', err))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and external API calls (Gemini, Google Sheets, etc.)
  if (event.request.method !== 'GET') return;
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('script.google.com') ||
      url.hostname.includes('openai.com') ||
      url.hostname.includes('drive.google.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful same-origin responses
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for HTML pages
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
