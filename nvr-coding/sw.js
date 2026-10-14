const CACHE = 'nvr-v14';
const ASSETS = ['index.html', 'lesson.html', 'review.html', 'playground.html', 'about.html', 'certificate.html', 'css/styles.css', 'config.js', 'js/app.js', 'js/lesson.js', 'js/review.js', 'js/playground.js', 'js/celebrate.js', 'js/auth.js', 'data/lessons.js', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));

self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

// Network-first for HTML/JS/CSS so edits show up immediately; cache is the offline fallback.
// Static assets (lessons data, icons) stay cache-first since they rarely change.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  const isShell = /\.(html|js|css)$/.test(url.pathname);

  if (!isShell) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    return;
  }

  e.respondWith(
    // cache:'no-cache' forces revalidation with the server so edits are never
    // served stale, even when the host sends no Cache-Control headers.
    fetch(new Request(e.request, { cache: 'no-cache' }))
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});