---
title: Laravel | Integrations
---

# Laravel

We assume you're using `laravel-vite-plugin` to integrate your Laravel application with Vite.

## Installation

Install `vite-plugin-pwa` plugin as dev dependency using `npm` or `yarn` or `pnpm`:
```shell
npm i vite-plugin-pwa -D
yarn add vite-plugin-pwa -D
pnpm add -D vite-plugin-pwa
```

## Configuration

You need to add `vite-plugin-pwa` to your `vite.config.js` file:
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({ /* PWA options */ })
  ]
}
```

Since `laravel-vite-plugin` is configuring Vite to use `public/build` folder as root build folder, you need to configure `vite-plugin-pwa` to change the path to include `/build/` in your Laravel base path (by default `/`):
```ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      buildBase: '/build/' // <== this is the default value, since base will be `/`
    })
  ]
}
```

## Registering Service Worker

Please read [Register Service Worker](/guide/register-service-worker) section for more information.

We suggest you to use `virtual:pwa-register` (VanillaJS) virtual module to register the service worker in your Laravel application, include this code in your `resources/js/app.js` file:
```ts
import { registerSW } from 'virtual:pwa-register';

registerSW({ /* options */ });
```

If you're using TypeScript, you may also need to register `vite-plugin-pwa/cleint` in your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "types": ["vite-client", "vite-plugin-pwa/client"]
  }
}
```

## Registering Web Manifest

To register the PWA web manifest in your Nuxt 3 application, `vite-plugin-pwa` exposes `virtual:pwa-info` virtual module you can use to write the web manifest:
```ts
/// <reference types="vite-plugin-pwa/info" />

import { pwaInfo } from 'virtual:pwa-info';

if (pwaInfo) {
  const href = pwaInfo.webManifest.href;
  /* add link to head: href is the link */
  const linkElement = document.createElement("link");
  linkElement.setAttribute("rel", "manifest");
  linkElement.setAttribute("href", href);
  if (pwaInfo.webManifest.useCredentials) {
    linkElement.setAttribute("crossorigin", 'use-credentials');
  }
  document.head.appendChild(linkElement);
}
```

If you're ont using TypeScript, you can omit the `/// <reference types="vite-plugin-pwa/info" />` line.

If you're using TypeScript, you may also need to register `vite-plugin-pwa/info` in your `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "types": ["vite-client", "vite-plugin-pwa/info"]
  }
}
```

or include a `vite-env.d.ts` file in your root or source folder:
```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/info" />
```
