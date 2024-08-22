---
title: 开始 | 指南
---

# 开始

Progressive Web Apps (PWAs) are web applications built and enhanced with modern APIs to deliver enhanced capabilities, reliability, and installability while reaching anyone, anywhere, on any device&mdash;all with a single codebase.

At a high level, a PWA consists of a [web application manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) to give the browser information about your app, and a service worker to manage the offline experience.

If you are new to Progressive Web Apps, you might consider reading Google's ["Learn PWA"](https://web.dev/learn/pwa/) course before you begin.

## Service Worker

Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available). They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow access to push notifications and background sync APIs.

A service worker is an event-driven [worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

You can find more information about service workers in [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## Vite PWA

Vite PWA will help you to turn your existing applications into PWAs with very little configuration. It comes preset with sensible defaults for common use cases.

The `vite-plugin-pwa` plugin can:

- Generate the [web appplication manifest][webmanifest] and add it to your entry point (see the [setup guide for manifest generation](pwa-minimal-requirements#web-app-manifest)).
- Generate the service worker using the `strategies` option (for more information, see ["Service Worker Strategies"](/guide/service-worker-strategies-and-behaviors#service-worker-strategies) section)
- Generate a script to register the service worker in the browser (see the ["Register Service Worker"](/guide/register-service-worker) section)

## Scaffolding Your First Vite PWA Project <Badge type="tip" text="New"/>

<ScaffoldingPWAProject />

## Installing vite-plugin-pwa

To install the `vite-plugin-pwa` plugin, just add it to your project as a `dev dependency`:

::: code-group
  ```bash [pnpm]
  pnpm add -D vite-plugin-pwa
  ```
  ```bash [yarn]
  yarn add -D vite-plugin-pwa
  ```
  ```bash [npm]
  npm install -D vite-plugin-pwa
  ```
:::

## Configuring vite-plugin-pwa

Edit your `vite.config.js / vite.config.ts` file and add the `vite-plugin-pwa`:

```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({ registerType: 'autoUpdate' })
  ]
})
```

With this minimal configuration of the `vite-plugin-pwa` plugin, your application is now able to generate the [Web App Manifest][webmanifest] and inject it at the entry point, generate the service worker and register it in the browser.

You can find the full list of the `vite-plugin-pwa` plugin configuration options in the following [client.d.ts](https://github.com/antfu/vite-plugin-pwa/blob/main/src/types.ts).

::: warning
If you are **NOT** using `vite-plugin-pwa` version `0.12.2+`, there is a bug handling `injectRegister` (the service worker generated will not include the code required to allow work with `autoUpdate` behavior).

If you're using a `vite-plugin-pwa` plugin version prior to `0.12.2`, you can fix the bug using this plugin configuration:
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ]
})
```
:::

If you want to check it in `dev`, add the `devOptions` option to the plugin configuration (you will have the [Web App Manifest][webmanifest] and the generated service worker):
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ]
})
```

If you build your application, the [Web App Manifest][webmanifest] will be generated and configured on the application entry point, the service worker will be also generated and the script/module to register it in the browser added.

::: info
`vite-plugin-pwa` plugin uses [workbox-build](https://developer.chrome.com/docs/workbox/modules/workbox-build) node library to build the service worker, you can find more information in the [Service Worker Strategies And Behaviors](/guide/service-worker-strategies-and-behaviors) and [Workbox](/workbox/) sections.
:::

[webmanifest]: https://developer.mozilla.org/en-US/docs/Web/Manifest
