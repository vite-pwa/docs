---
title: Service Worker Precache | Guide
---

# Service Worker Precache

As explained in the [Service Worker](/guide/#service-worker) section, service workers act as proxies intercepting requests between the browser and the server.

To add PWA capability to your application, we need to give it a service worker. The service worker's precache manifest must include all the resources of your application, so that the service worker knows what resources to download into the browser's cache storage for use during `network requests interception` and when the application is offline.

::: tip Network requests interception
You can also configure whether to apply network request interception for any of your application resources. You can find more information on [Workbox - Caching Strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/#caching-strategies).
:::

Once the application registers the service worker, the browser will try to install it. This involves downloading all the resources in the service worker's precache manifest, and then trying to activate the service worker to take the control of the application.

::: tip
The browser will **only** download the resources in the service worker's precache manifest **if the service worker is not installed** (the first time the user visits your application) or **if there is a new version of your application** (if you change some resource in your application, the service worker will also change once you build the application, since its precache manifest is modified to include your changes). 

The browser will always download these resouces **in a background thread** and not in the main browser thread, so that the application is usable even before the service worker is installed. 

You can see this behaviour on this website or the [VueUse docs site](https://vueuse.org/) in a private window. Just open `Network Tab` on dev tools before visiting the site: the browser will be downloading all the resources while you navigate the site.
:::

## Precache Manifest

Since `vite-plugin-pwa` plugin uses the [workbox-build](https://developer.chrome.com/docs/workbox/modules/workbox-build/) node library to build the service worker, it will only include `css`, `js` and `html` resources in the manifest precache (check the `globPatterns` entry in [GlobPartial](https://developer.chrome.com/docs/workbox/modules/workbox-build#type-GlobPartial)).

The `workbox-build` node library is file based: it will traverse the build output folder of your application. `Vite` will generate your build in the `dist` folder, and so, `workbox-build` will traverse the `dist` folder adding all resources found in it to the service worker's precache manifest.

If you need to include another resource types, you will need to add them to the `globPatterns` entry. Depending on the `strategy` configured in the `vite-plugin-pwa` plugin configuration, you will need to add it under the `workbox` or `injectManifest` configuration option.

You can find more information in the [Static assets handling](/guide/static-assets) section.

For example, if you need to add `ico`, `png` and `svg` resources in the example from the [Configuring vite-plugin-pwa - Guide](/guide/#configuring-vite-plugin-pwa) section, you will need to add `globPatterns` under `workbox` entry, since we're using the default `vite-plugin-pwa` strategy (`generateSW`):
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```
