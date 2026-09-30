/* =========================================================
   JAMB Study Tracker — service worker
   Network-first, cache fallback: you always get the newest
   version while online, and the whole app keeps working
   offline (including on a flaky campus connection).
   ========================================================= */

const CACHE = 'jamb-study-v2';

const ASSETS = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/questions.js',
  './js/q-use-of-english.js',
  './js/q-mathematics.js',
  './js/q-physics.js',
  './js/q-chemistry.js',
  './js/q-biology.js',
  './js/q-economics.js',
  './js/q-government.js',
  './js/q-geography.js',
  './js/q-literature.js',
  './js/q-history.js',
  './js/q-commerce.js',
  './js/q-further-maths.js',
  './js/q-agricultural-science.js',
  './js/q-principles-of-accounts.js',
  './js/config.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .catch(() => { /* a single missing asset must not break install */ })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) =>
          hit || (req.mode === 'navigate' ? caches.match('./index.html') : Promise.reject(new Error('offline')))
        )
      )
  );
});
