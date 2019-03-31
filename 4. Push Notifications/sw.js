const cacheName = "sw-statics";
const resources = ["/", "index.html"];

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

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // fetch fails when couldn't reach the network
      return caches.match(event.request);
    })
  );
});

// =========== NOTIFICATIONS
self.addEventListener("notificationclose", e => {
  const notification = e.notification;
  const primaryKey = notification.data.primaryKey;

  console.log("Closed notification: " + primaryKey);
});

self.addEventListener("notificationclick", e => {
  const { notification, action } = e;

  console.log("action", action); // "" | "zamknij" | "eksploruj"

  if (action === "zamknij") {
    notification.close();
  } else {
    clients.openWindow("http://www.example.com");
    notification.close();
  }

  /* 
  The code below looks for the first window with visibilityState set to visible. 
  If one is found it navigates that client to the correct URL and focuses the window. 
  If a window that suits our needs is not found, it opens a new window. 
  */
  clients.matchAll().then(function(clis) {
    var client = clis.find(function(c) {
      c.visibilityState === "visible";
    });
    if (client !== undefined) {
      client.navigate("some_url");
      client.focus();
    } else {
      // there are no visible windows. Open one.
      clients.openWindow("some_url");
      notification.close();
    }
  });
});

self.addEventListener("push", function(e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "images/notification-flat.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png"
      },
      {
        action: "close",
        title: "I don't want any of this",
        icon: "images/xmark.png"
      }
    ]
  };
  e.waitUntil(self.registration.showNotification("Push Notification", options));
});
