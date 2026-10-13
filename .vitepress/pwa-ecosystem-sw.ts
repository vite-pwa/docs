/// <reference types="vite/client" />
/// <reference lib="webworker" />

import { CacheableResponsePlugin } from '@vite-pwa/workbox-swkit/cacheable-response'
import { ExpirationPlugin } from '@vite-pwa/workbox-swkit/expiration'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from '@vite-pwa/workbox-swkit/precaching'
import { NavigationRoute, registerRoute } from '@vite-pwa/workbox-swkit/routing'
import { NetworkFirst, NetworkOnly, StaleWhileRevalidate } from '@vite-pwa/workbox-swkit/strategies'
import { API_CACHE_NAME, API_PAGE_REGEX, prepareApiPages } from './pages.ts'

declare let self: ServiceWorkerGlobalScope

// eslint-disable-next-line no-console
console.log('X')

async function createCaches(): Promise<void> {
  await Promise.all([
    caches.open('google-fonts-cache'),
    caches.open('jsdelivr-images-cache'),
    caches.open('api-cache'),
  ])
}

if (import.meta.env.PROD) {
  // create caches, this way we can cache assets from the beginning
  self.addEventListener('install', (event): void => {
    event.waitUntil(createCaches())
  })
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

const apiPages = prepareApiPages()
const selfHostname = self.location.hostname

precacheAndRoute(
  self.__WB_MANIFEST,
  {
    parallel: {
      enabled: true,
      concurrency: 5,
    },
    urlManipulation: ({ url }) => {
      const urls: URL[] = []
      if (url.hostname !== selfHostname) {
        return urls
      }
      const pathname = url.pathname
      if (pathname === '/404.html') {
        return urls
      }
      if (pathname === '/404') {
        const newURL = new URL('/404.html', url)
        newURL.search = ''
        urls.push(newURL)
        return urls
      }

      const apiPage = apiPages.get(pathname)
      if (apiPage) {
        const newURL = new URL(apiPage, url)
        newURL.hash = url.hash
        urls.push(newURL)
        return urls
      }

      if (!pathname.endsWith('.html')) {
        let newURL = new URL(`${pathname}.html`, url)
        newURL.hash = url.hash
        urls.push(newURL)
        newURL = new URL(`${pathname}/index.html`, url)
        newURL.hash = url.hash
        urls.push(newURL)
      }
      return urls
    },
  },
)

// clean old assets
cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
let denylist: undefined | RegExp[]
if (import.meta.env.DEV) {
  allowlist = [/^\/$/]
}

if (import.meta.env.PROD) {
  const apiAssetRegexp = /^\/assets\/(?:vite-pwa-workbox|unplugin-pwa)_api_(?:packages|symbols)_/i
  denylist = [apiAssetRegexp, API_PAGE_REGEX]
  // hoist regexp
  registerRoute(
    ({ request, sameOrigin }) => {
      return sameOrigin && request.mode === 'navigate'
    },
    new NetworkOnly({
      plugins: [{
        /* this callback will be called when the fetch call fails */
        handlerDidError: async ({ request }) => {
          const url = new URL(request.url)
          const path = url.pathname
          return Response.redirect(`/404?q=${encodeURIComponent(path)}`, 302)
        },
        /* this callback will prevent caching the response */
        cacheWillUpdate: async () => null,
      }],
    }),
    'GET',
  )
  // googleapis
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/i,
    new NetworkFirst({
      cacheName: 'google-fonts-cache',
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        // we only need a few entries
        new ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
        }),
      ],
    }),
    'GET',
  )
  // gstatic
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/.*/i,
    new StaleWhileRevalidate({
      cacheName: 'google-fonts-cache',
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        // we only need a few entries
        new ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
        }),
      ],
    }),
    'GET',
  )
  // antfu sponsors
  registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
    new NetworkFirst({
      cacheName: 'jsdelivr-images-cache',
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        // we only need a few entries
        new ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
        }),
      ],
    }),
    'GET',
  )
  // api pages and assets
  registerRoute(
    ({ sameOrigin, url }) => {
      if (!sameOrigin) {
        return false
      }
      const path = url.pathname
      return API_PAGE_REGEX.test(path) || apiAssetRegexp.test(path)
    },
    new NetworkFirst({
      cacheName: API_CACHE_NAME,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
        }),
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
    'GET',
  )
}

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist, denylist },
))
