const CACHE_NAME = 'static-cache-v1';

const FILES_TO_CACHE = [
'/',
'../src/user/login/Login.js',
'../src/styles/login.scss',
'/thumbnail192.png'
];

self.addEventListener('install', pEvent => {

    pEvent.waitUntil(
        caches.open(CACHE_NAME).then(
            (cache) => {
                console.log('Service Worker offline page.');
                return cache.addAll(FILES_TO_CACHE);
            }
        )
    )
  });

  self.addEventListener('activate', pEvent => {

    pEvent.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(key !== CACHE_NAME) {
                    console.log('Service Worker Removing old cache',key);
                    return caches.delete(key);
                }
            }))
        })
    )

  });

  self.addEventListener('fetch', pEvent => {
      if(pEvent.request.mode !== 'navigate') {
          return;
      }

      pEvent.respondWith(
          fetch(pEvent.request)
          .catch(() => {
              return caches.open(CACHE_NAME)
              .then((cache) => {
                  return cache.match('../src/user/login/Login.js')
              })
          })
      )
});