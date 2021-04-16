const CACHE_NAME = "kitbisakodingv2";
let urlToCache = [
  "/",
  "/index.html",
  "/src/js/materialize/materialize.min.js",
  "/src/js/pages.js",
  "/src/js/script.js",
  "/src/pages/about.html",
  "/src/pages/article.html",
  "/src/pages/class.html",
  "/src/pages/home.html",
  "/src/pages/nav.html",
  "/src/styles/materialize/materialize.min.css",
  "/src/styles/css/style.css",
  "/src/assets/arrowNegative.svg",
  "/src/assets/career.svg",
  "/src/assets/decision.svg",
  "/src/assets/group.svg",
  "/src/assets/kitaBisaKoding-long.png",
  "/src/assets/pattern.svg",
  "/src/assets/rocket.svg",
  "/src/assets/rocket_launch.svg",
  "/src/assets/article/article1.png",
  "/src/assets/article/article2.jpg",
  "/src/assets/article/article3.jpg",
  "/src/assets/article/article4.jpg",
  "/src/assets/favicon/kitaBisaKoding.ico",
  "/src/assets/imgClass/android.png",
  "/src/assets/imgClass/backend.png",
  "/src/assets/imgClass/frontend.png",
  "/src/assets/logo/kitaBisaKoding.png",
  "/src/assets/logo/icon-144x144.png",
  "/src/assets/logo/icon-192x192.png",
  "/src/assets/logo/icon-512x512.png",
  "/manifest.json",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlToCache);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (caceName) {
          if (caceName != CACHE_NAME) {
            return caches.delete(caceName);
          }
        })
      );
    })
  );
});
