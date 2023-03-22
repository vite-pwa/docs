---
title: Custom Service Worker | Guide
---

# Custom Service Worker

Sometimes you don't need the full blown PWA functionality like **offline cache** and **manifest file**, but need simple custom Service Worker. 

You can disable all `vite-plugin-pwa` supported features, and use it just to manage your Service Worker file.

## Service Worker code

Suppose you want to have a Service Worker file `src/service-worker.js` that captures browser `fetch`.

```js
self.addEventListener("fetch", (event) => {
  console.log("Hello from SW debug console");
  event.respondWith(fetch(event.request));
});
```

You would like to have this Service Worker reloaded on each change in **development** and prepared for **production**.


## Plugin Configuration

You **must** configure following in `vite-plugin-pwa` plugin options in your `vite.config.ts` file:

```ts
VitePWA({
  srcDir: "src",
  filename: "service-worker.js",
  strategies: "injectManifest",
  injectRegister: false,
  manifest: false,
  injectManifest: {
    injectionPoint: null,
  },
})
```

## Development

If you would like the service worker to run in development, make sure to enable it in the [devOptions](/guide/development#plugin-configuration) and to set the type to [module](/guide/development#injectmanifest-strategy) if required.

## Registering of the Service Worker in your app

Use the code below in your `src/main.tsx` file.

```ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw'
  )
}
```

If you're using import statements inside your sw (will work only on chromium based browsers). [Read more](/guide/development.html#injectmanifest-strategy)
```ts
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === 'production' ? '/service-worker.js' : '/dev-sw.js?dev-sw',
    { type: import.meta.env.MODE === 'production' ? 'classic' : 'module' }
  )
}
```
