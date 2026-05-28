// CCTV Verify — Service Worker v1.0
// Cache app shell for offline use; time sync still requires network.

const CACHE = 'cctv-verify-v1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // NEVER cache time-sync requests
  const isTimeSource =
    url.hostname.includes('cloudflare.com') ||
    url.hostname.includes('worldtimeapi.org') ||
    url.hostname.includes('timeapi.io') ||
    url.hostname.includes('google.com') ||
    url.hostname.includes('apple.com');

  if (isTimeSource) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
    return;
  }

  // App shell: cache-first
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
