self.addEventListener("install", (event) => {
    console.log("service worker installed!!!!!");
    self.skipWaiting()
    event.waitUntil(
      caches
        .open("simpleApp-1")
        .then((cache) => {
          return cache.addAll([
            "./index.html",
            "./assets/css/bootstrap.min.css",
            "./assets/js/bootstrap.bundle.js",
            "./assets/img/img.jpg"
          ]);
        })
        .catch((err) => console.log("cache error", err))
    );
  });
  
  self.addEventListener("activate", () => {
    console.log("service worker activate!!!!!");
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then((file) => {
          if (file) {
            console.log("Found in cache", event.request.url);
            return file;
          }
          console.log("Network request :", event.request.url);
          return fetch(event.request.url);
        })
        .catch((err) => console.log(err))
    );
  });
  