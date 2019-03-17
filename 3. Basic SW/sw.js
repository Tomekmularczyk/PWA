const cacheName = "pwa-test1";

const onlineFirstPage = "offline.html";
const resources = ["/", "a.html", "b.html", "c.html", onlineFirstPage];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resources);
    })
  );
});

self.addEventListener("activate", e => {
  // --- Delete unused caches when new SW takes over
  const cacheWhiteList = [cacheName];
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

function isOnlineFirstPage(request) {
  return request.method === "GET" && request.url.includes("article.html");
}

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.status === 404) {
          // return caches.match('pages/404.html'); // return custom 404 page
        }
        // Dynamically add fetched files to the cache
        return caches.open(cacheName).then(cache => {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
      .catch(() => {
        // fetch fails when couldn't reach the network
        if (isOnlineFirstPage(event.request)) {
          return caches.match(onlineFirstPage);
        }
        return caches.match(event.request);
      })
  );
});
