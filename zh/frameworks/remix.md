---
title: Remix | Frameworks
next: 开始 | Examples
outline: deep
---

# Remix

<ChangeLog />

::: warning
This PWA module can only be used with Vite.
:::

## Remix PWA module

`vite-plugin-pwa` provides the new `@vite-pwa/remix` module that will allow you to use `vite-plugin-pwa` in your Remix applications via `Vite` plugin and `Remix` preset.

You will need to install `@vite-pwa/remix`:
::: code-group
  ```bash [pnpm]
  pnpm add -D @vite-pwa/remix
  ```
  ```bash [yarn]
  yarn add -D @vite-pwa/remix
  ```
  ```bash [npm]
  npm install -D @vite-pwa/remix
  ```
:::

Then in your Vite configuration file, import the `@vite-pwa/remix` helper and create the Remix PWA Preset and the Vite PWA Plugin and configure them:
```ts
// vite.config.js
import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import { RemixVitePWA } from '@vite-pwa/remix'

installGlobals()

const { RemixVitePWAPlugin, RemixPWAPreset } = RemixVitePWA()

export default defineConfig({
  plugins: [
    remix({
      presets: [RemixPWAPreset()],
    }),
    RemixVitePWAPlugin({
      // PWA options
    })
  ]
})
```

Check Remix [PWA Options](https://github.com/vite-pwa/remix/blob/main/src/types.ts) for further details.

## Custom Service Worker

When using `injectManifest` strategy, `@vite-pwa/remix` exposes a virtual module `virtual:vite-pwa/remix/sw` with the Remix information you can consume in your service worker (configuration from Remix and the `remix` PWA option):
```ts
import {
  cleanupOutdatedCaches,
  clientsClaimMode,
  enablePrecaching,
  navigateFallback,
  promptForUpdate,
  staticRoutes,
  dynamicRoutes,
  routes,
  ssr,
} from 'virtual:vite-pwa/remix/sw'
```

If you are using TypeScript you can include `@vite-pwa/remix/remix-sw` in your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["@vite-pwa/remix/remix-sw"]
  }
}
```

or just include a triple slash comment in your service worker file:
```ts
/// <reference types="@vite-pwa/remix/remix-sw" />
```

You can also import PWA options via `@vite-pwa/remix/sw` (see next section):
```ts
import {
  cleanupOutdatedCaches,
  clientsClaimMode,
  enablePrecaching,
  navigateFallback,
  promptForUpdate,
  staticRoutes,
  dynamicRoutes,
  routes,
  ssr,
} from '@vite-pwa/remix/sw'
```

### `setupPwa` helper functions

`@vite-pwa/remix` provides an internal `setupPWA` module you can use to register a default implementation (similar to Workbox recipes), using the `remix` `PWA options and Remix configuration:
- cleanup outdated caches: Workbox's `cleanupOutdatedCaches` in `generateSW` Workbox build module for `injectManifest` strategy
- clients claim mode: similar to Workbox's `cleanupOutdatedCaches` in `generateSW` Workbox build module for `injectManifest` strategy
- precaching and offline configuration

You only need to import `setupPWA` from `@vite-pwa/remix/sw` and call it in your service worker:
```ts
import { setupPwa } from '@vite-pwa/remix/sw'

setupPwa({ manifest: self.__WB_MANIFEST })
```

### Enabling Offline Support

If your Remix application is an SPA, all routes will be pre-rendered, and you don't need to add additional logic, all html pages will be in the `self.__WB_MANIFEST` array.

If you're using Remix SSR application, then you need to add [registerRoute](https://developer.chrome.com/docs/workbox/modules/workbox-routing) to handle the SSR routes to avoid default offline browser page when navigate to them: you can import `dynamicRoutes` and `staticRoutes` from the `virtual:vite-pwa/remix/sw` or `@vite-pwa/remix/sw` to register the SSR routes.

Check the [shared-sw.ts module](https://github.com/vite-pwa/remix/blob/main/examples/pwa-simple-sw/app/shared-sw.ts) and the usage in the [service worker](https://github.com/vite-pwa/remix/blob/main/examples/pwa-simple-sw/app/plain-sw.ts), remember to exclude the router in dev server.

## PWA Assets <Badge text="Experimental" type="tip"/>

This feature includes the following components:
- `PwaManifest` component to include the PWA manifest in your HTML pages: will inject the PWA web manifest in the HTML head
- `PwaAssets` component to include the PWA assets in your HTML pages: will inject the PWA assets in the HTML head (PWA web manifest, theme-color, favicon and PWA web manifest)

## Remix PWA Alternative

You can use [Remix PWA](https://remix-pwa.run/) to add PWA support to your Remix application.


