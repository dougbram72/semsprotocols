const cacheName = 'protocol-cache-v4';
self.addEventListener('install', function(event) {
  console.log(`sw installed ${cacheName}`);
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(
          [
           
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js",
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
            "/semsprotocols/",
            "/semsprotocols/*.*"
            
          ]
        );
      })
    );
  });

  

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });

  self.addEventListener('activate', function(event) {
    console.log('sw activate called')
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });