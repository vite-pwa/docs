---
title: Unregister Service Worker | 指南
---

# Unregister Service Worker

If you want to unregister the service worker from your PWA application, you only need to add `selfDestroying: true` to the plugin configuration.

`vite-plugin-pwa` plugin will create a new special service worker and replace the existing one in your application once deployed in production: it has to be put in the place of the previous broken/unwanted service worker, with the same name.

::: info
From version `0.17.2+`, the service worker will delete all of its cache storage entries.
:::

::: danger
It is **IMPORTANT TO NOT CHANGE ANYTHING** in the plugin configuration, especially **DO NOT CHANGE THE SERVICE WORKER NAME**, just keep the options and the PWA UI components (if included), the plugin will take care of changing the service worker and avoid interacting with the UI if configured.
:::

In a future, if you want to add the PWA again to your application, you only need to remove the `selfDestroying` option or just disable it: `selfDestroying: false`.

## Custom `selfDestroying` Service Worker

If you want to remove the current deployed service worker but installing a new one, don't use `selfDestroying`:
- create a new JavaScript file with the current deployed service worker name in the `public` folder, check the example below
- change `filename` in the PWA configuration (this will generate a new service worker with the new name)

For example, if you don't specify the `filename`, the service worker name will be `sw.js` (default). Change the `filename` PWA option to `service-worker.js` or other name different to `sw.js`, then add the following code to `public/sw.js` file (the current deployed service worker):

```js
// public/sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  self.registration.unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      clients.forEach((client) => {
        if (client instanceof WindowClient)
          client.navigate(client.url);
      });
      return Promise.resolve();
    })
    .then(() => {
      self.caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map((cacheName) => {
            return self.caches.delete(cacheName);
          })
        );
      })
    });
});
```

You can repeat the above process as many times as necessary, **remember not to delete** any service worker from the public directory (you don't know what version the users of your application have installed).

## Development

You can also check the `selfDestroying` plugin option in the dev server with development options enabled: check [Development section](/guide/development) for more info.

## Examples

You have in the examples folder the `**-destroy` scripts in their corresponding `package.json`, you can try it on the development server or from the production build.

## Credits

The implementation is based on this GitHub repo [Self-destroying ServiceWorker](https://github.com/NekR/self-destroying-sw), for more info read [Medium: Self-destroying ServiceWorker](https://medium.com/@nekrtemplar/self-destroying-serviceworker-73d62921d717).
