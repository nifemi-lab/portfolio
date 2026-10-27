/* =========================================================
   JAMB Study Tracker — service worker
   Network-first, cache fallback: you always get the newest
   version while online, and the whole app keeps working
   offline (including on a flaky campus connection).
   ========================================================= */

const CACHE = 'jamb-study-v13';

const ASSETS = [
  './',
  './index.html',
  './maths.html',
  './css/maths.css',
  './js/syllabus-mathematics.js',
  './js/lessons-mathematics.js',
  './js/maths.js',
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
  './js/sol-mathematics.js',
  './js/sol-use-of-english.js',
  './js/sol-further-maths.js',
  './js/sol-chemistry.js',
  './js/sol-physics.js',
  './js/sol-biology.js',
  './js/sol-economics.js',
  './js/sol-government.js',
  './js/sol-geography.js',
  './js/sol-literature.js',
  './js/sol-history.js',
  './js/sol-commerce.js',
  './js/sol-agricultural-science.js',
  './js/sol-principles-of-accounts.js',
  './js/notes-mathematics.js',
  './js/notes-further-maths.js',
  './js/notes-use-of-english.js',
  './js/notes-chemistry.js',
  './js/notes-physics.js',
  './js/notes-biology.js',
  './js/notes-economics.js',
  './js/notes-government.js',
  './js/notes-geography.js',
  './js/notes-literature.js',
  './js/notes-history.js',
  './js/notes-commerce.js',
  './js/notes-agricultural-science.js',
  './js/notes-principles-of-accounts.js',
  './js/config.js',
  './students/',
  './students/index.html',
  './students/privacy.html',
  './students/learn.css',
  './students/core.js',
  './students/cloud.js',
  './students/learn.js',
  './students/data/tracks.js',
  './students/assets/3d/abacus-3d.png',
  './students/assets/3d/thermometer-3d.png',
  './students/assets/3d/pizza-3d.png',
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
      .catch(() => {
        const isLearn = new URL(req.url).pathname.indexOf('/students/') !== -1;
        return caches.match(req, { ignoreSearch: true }).then((hit) => {
          if (hit) return hit;
          if (req.mode !== 'navigate') throw new Error('offline');
          return caches.match(isLearn ? './students/index.html' : './index.html');
        });
      })
  );
});
