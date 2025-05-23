// // sw.js

console.log("Service Worker: Installed");
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["/", "/index.html", "/script.js", "/style.css"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("push", function (event) {
  const payload = event.data ? event.data.text() : "no payload";

  const data = JSON.parse(payload);

  const promiseChain = self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/icon-48x48.png",
  });

  event.waitUntil(promiseChain);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: "push-received",
        payload: payload,
      });
    });
  });
});
