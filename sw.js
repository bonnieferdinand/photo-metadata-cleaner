// Offline cache for the single-page app. Network first so updates show up right away;
// the cached copy is used when the network is slow (over 3 s) or gone.
const CACHE = "pmc-v1";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(["./"])).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const net = fetch(req).then(res => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    });
    e.waitUntil(net.catch(() => {}));
    const cached = await cache.match(req, { ignoreSearch: true });
    if (!cached) return net;
    const slow = new Promise(r => setTimeout(() => r(cached), 3000));
    return Promise.race([net.catch(() => cached), slow]);
  })());
});
