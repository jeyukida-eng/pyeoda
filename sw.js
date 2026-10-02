const CACHE_NAME = 'pyeoda-shell-v8-0';
const RUNTIME_CACHE = 'pyeoda-runtime-v8-0';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('pyeoda-') && ![CACHE_NAME, RUNTIME_CACHE].includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const data = event.data || {};
  if (data.type !== 'CACHE_URL' || !data.url) return;
  event.waitUntil((async () => {
    try {
      const url = new URL(data.url);
      if (url.origin !== self.location.origin) return;
      const res = await fetch(url.toString(), { cache: 'no-store' });
      if (res.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(url.toString(), res.clone());
      }
    } catch (_) {}
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(req, fresh.clone());
        }
        return fresh;
      } catch (_) {
        const direct = await caches.match(req);
        if (direct) return direct;
        const shell = await caches.open(CACHE_NAME);
        const keys = await shell.keys();
        if (keys.length) return shell.match(keys[0]);
        return new Response('펴다를 처음 한 번은 인터넷에 연결된 상태에서 열어 주세요.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    }).catch(() => null);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || new Response('', { status: 504 });
  })());
});
