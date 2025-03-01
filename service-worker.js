// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('rara-bot').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/page/commands.html'
        // Add other files you want to cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Bypass the cache for dynamic endpoints such as /logout.
  if (event.request.url.includes('/logout')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
