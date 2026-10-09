const CACHE = 'nvr-v12';
const ASSETS = ['index.html', 'lesson.html', 'review.html', 'playground.html', 'about.html', 'css/styles.css', 'js/app.js', 'js/lesson.js', 'js/review.js', 'js/playground.js', 'js/celebrate.js', 'data/lessons.js', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
