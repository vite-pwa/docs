---
title: Service Worker without PWA capabilities | 指南
---

# Service Worker without PWA capabilities

Sometimes you don't need the full blown PWA functionality like **offline cache** and **manifest file**, but need simple custom Service Worker. 

You can disable all `vite-plugin-pwa` supported features, and use it just to manage your Service Worker file.

## Service Worker code

Suppose you want to have a Service Worker file that captures browser `fetch`:
```js
// src/service-worker.js or src/service-worker.ts
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
```

You would like to have this service worker reloaded on each change in **development** and prepared for **production**.

## Plugin Configuration

You should configure `vite-plugin-pwa` plugin options in your Vite configuration file with the following options:
```js
// vite.config.js or vite.config.ts
VitePWA({
  srcDir: "src",
  filename: "service-worker.js",
  strategies: "injectManifest",
  injectRegister: false,
  manifest: false,
  injectManifest: {
    injectionPoint: undefined,
  },
})
```

## Development

If you would like the service worker to run in development, make sure to enable it in the [devOptions](/guide/development#plugin-configuration) and to set the type to [module](/guide/development#injectmanifest-strategy) if required.

## Registering of the Service Worker in your app

Use the code below in your entry point module:
```js
// src/main.js or src/main.ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
  )
}
```

If you're using import statements inside your service worker (will work only on chromium based browsers) check [injectManifest](/guide/development.html#injectmanifest-strategy) section for more info:
```js
// src/main.js or src/main.ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw',
    { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
  )
}
```
