// v2 has no service worker. v1 installed one that shows the old page from its
// cache, so a returning visitor would keep seeing v1. Their browser checks this
// address for a new version, finds this file, and it removes the old one: it
// deletes the caches, unregisters itself and reloads the open pages.
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(names.map((name) => caches.delete(name)))
      await self.registration.unregister()
      const pages = await self.clients.matchAll({ type: 'window' })
      for (const page of pages) {
        page.navigate(page.url)
      }
    })(),
  )
})
