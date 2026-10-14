const CACHE = 'nvr-v13';
const ASSETS = ['index.html', 'lesson.html', 'review.html', 'playground.html', 'about.html', 'certificate.html', 'css/styles.css', 'config.js', 'js/app.js', 'js/lesson.js', 'js/review.js', 'js/playground.js', 'js/celebrate.js', 'js/auth.js', 'data/lessons.js', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));