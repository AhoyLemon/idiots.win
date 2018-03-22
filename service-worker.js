'use strict';

const PRECACHE = 'precache-v24';
const RUNTIME = 'runtime';
const offlineUrl = '/offline.html';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/index.html',
  '/manifest.json',
  '/css/idiots.css',
  '/js/min/idiots.min.js',
  '/js/libraries/jquery.min.js',
  '/svg/offline.svg',
  offlineUrl
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(offlineUrl);
      })
    );
  } else {
    event.respondWith(caches.match(event.request).then(function (response) {
        return response
      })
    );
  }
});