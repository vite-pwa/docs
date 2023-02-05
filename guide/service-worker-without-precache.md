---
title: Service Worker Without Precache | Guide
---

# Service Worker Without Precache

::: tip
Read previous section for context: [Service Worker Precache](/guide/service-worker-precache.md)
:::

From `vite-plugin-pwa v0.14.0+` you can register your custom service worker (using `injectManifest` strategy) without injection point (no service worker precache manifest).

You only need to configure `injetManifest` with an `undefined` injection point:
```ts
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        injectionPoint: undefined
      }
    })
  ]
})
```

Then in your custom service worker, you can omit the precache manifest injection, you have an example in the repo: [custom-service-worker](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/examples/vanilla-ts-no-ip/src/custom-sw.ts). 
