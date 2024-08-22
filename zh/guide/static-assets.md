---
title: Static assets handling | 指南
---

# Static assets handling

By default, all icons on `PWA Web App Manifest` option found under Vite's `publicDir` option directory, will be included in the service worker *precache*. You can disable this option using `includeManifestIcons: false`.

You can also add other static assets such as `favicon`, `svg` and `font` files using `includeAssets` option. The `includeAssets` option will be resolved using [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) found under Vite's `publicDir` option directory, and so you can use regular expressions to include those assets, for example: `includeAssets: ['fonts/*.ttf', 'images/*.png']`. You don't need to configure `PWA Manifest icons` on `includeAssets` option.

## Reusing src/assets images

::: warning
This feature is not yet available.
:::

If you are using images in your application via `src/assets` directory (or any other directory), and you want to reuse those images in your `PWA Manifest` icons, you can use them with these 3 limitations:
- any image under `src/assets` directory (or any other directory) must be used in your application via static import or directly on the `src` attribute
- you must reference the images in the `PWA Manifest` icons using the assets directory path relative to the root folder: `./src/assets/logo.png` or `src/assets/logo.png`
- inlined icons cannot be used, in that case you will need to copy/move those images to the Vite's `publicDir` option directory: refer to [Importing Asset as URL](https://vitejs.dev/guide/assets.html#importing-asset-as-url) and [Vite's assetsInlineLimit option](https://vitejs.dev/config/build-options.html#build-assetsinlinelimit)


::: warning
If you're using `PWA Manifest` icons from any asset folder, but you are not using those images in your application (via static import or in src attribute), Vite will not emit those assets, and so missing from the build output:

```shell
Error while trying to use the following icon from the Manifest: https://localhost/src/assets/pwa-192x192.png (Download error or resource isn't a valid image)
```

In that case, you need to copy or move those images to the Vite's `publicDir` option directory (defaults to `public`) and configure the icons properly.
:::

For example, if you have the following image `src/assets/logo-192x192.png` you can add it to your `PWA Manifest` icon using:

```json
{
  "src": "./src/assets/logo-192x192.png",
  "sizes": "192x192",
  "type": "image/png"
}
```

then, in your codebase, you must use it via static import:

```js
// src/main.js or src/main.ts
// can be any js/ts/jsx/tsx module or single file component
import logo from './assets/logo-192x192.png'

document.getElementById('logo-img').src = logo
```

or using the `src` attribute:

```js
// src/main.js or src/main.ts
// can be any js/ts/jsx/tsx module or single file component
document.getElementById('#app').innerHTML = `
  <img src="./assets/logo-192x192.png" alt="Logo" width="192" height="192" />
`
```

## globPatterns

If you need to include other assets that are not under Vite's `publicDir` option directory, you can use the `globPatterns` parameter of [workbox](https://developer.chrome.com/docs/workbox/modules/workbox-build#generatesw) or [injectManifest](https://developer.chrome.com/docs/workbox/modules/workbox-build#injectmanifest) plugin options.

::: warning
If you configure `globPatterns` on `workbox` or `injectManifest` plugin option, you **MUST** include all your assets patterns: `globPatterns` will be used by `workbox-build` to match files on `dist` folder.

By default, `globPatterns` will be `**/*.{js,css,html}`: `workbox` will use [glob primer](https://github.com/isaacs/node-glob#glob-primer) to match files using `globPatterns` as filter.

A common pitfall is to only include some assets and forget to add `css`, `js` and `html` assets pattern, and then your service worker will complain about missing resources.

For example, if you don't include `html` assets pattern, you will get this error from your service worker:  **WorkboxError non-precached-url index.html**.
:::

To configure `globPatterns` you need to use `workbox` or `injectManifest` plugin option for`generateSW` and `injectManifest` strategies respectively:

::: code-group
  ```ts [generateSW]
  VitePWA({
    workbox: {
      globPatterns: ['**/*.{js,css,html}'],
    }
  })
  ```
  ```ts [injectManifest]
  VitePWA({
    injectManifest: {
      globPatterns: ['**/*.{js,css,html}'],
    }
  })
  ```
:::

