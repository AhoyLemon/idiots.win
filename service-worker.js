'use strict';

const cacheName = 'v1.01';

self.addEventListener('install', e => {
  // once the SW is installed, go ahead and fetch the resources
  // to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/css/idiots.css',
        '/js/min/idiots.min.js',
        '/js/libraries/jquery.min.js',
        '/offline.html',
        '/svg/offline.svg'
      ]).then(() => self.skipWaiting());
    })
  );
});