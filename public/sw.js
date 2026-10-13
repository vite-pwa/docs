/* eslint-disable no-restricted-globals */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    await self.registration.unregister()
    const cacheNames = await self.caches.keys()
    await Promise.all(cacheNames.filter(name => name.startsWith('workbox-')).map(name => self.caches.delete(name)))
    const clients = await self.clients.matchAll({ type: 'window' })
    await Promise.all(clients.map(client => client.navigate(client.url).catch(() => {})))
  })())
})
