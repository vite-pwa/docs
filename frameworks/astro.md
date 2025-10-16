---
title: Astro | Frameworks
outline: deep
---

# Astro

<ChangeLog />

::: warning
You will need to update your application to use Vite ^3.1.0 and latest `vite-plugin-pwa` 0.13.1+.
:::

## Astro Integration

`vite-plugin-pwa` provides the new `@vite-pwa/astro` integration that will allow you to use `vite-plugin-pwa` in your Astro applications.

You will need to install `@vite-pwa/astro` using:

::: code-group
  ```bash [pnpm]
  pnpm add -D @vite-pwa/astro
  ```
  ```bash [yarn]
  yarn add -D @vite-pwa/astro
  ```
  ```bash [npm]
  npm install -D @vite-pwa/astro
  ```
:::

To update your project to use the new `vite-plugin-pwa` integration for Astro, you only need to change the Astro config file removing the PWA plugin if present:

```ts
import { defineConfig } from 'astro/config'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    AstroPWA({
      /* your pwa options */
    })
  ]
})
```

## Importing Virtual Modules

::: warning
Since Astro will not inject any script in your application when using Astro components, you will need to use/import a PWA virtual module.
:::

You can also enable [Development Support](/guide/development) to test your PWA webmanifest and debug your custom service worker logic as you develop your Astro application.

### Auto Update

The best place to use/import the PWA virtual module will be in the main layout of the application (you should register it in any layout):

::: details src/layouts/Layout.astro
```astro
---
import { pwaInfo } from 'virtual:pwa-info';

export interface Props {
  title: string;
}

const { title } = Astro.props as Props;
---
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/pwa-192x192.png">
    <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF">
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="theme-color" content="#ffffff">
    <title>{title}</title>
    <meta name="description" content={title}>
    <script src="/src/pwa.ts"></script>
    { pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} /> }
  </head>
  <body>
    <main>
        <article>
            <slot />
        </article>
    </main>
  </body>
</html>
```
:::

::: details src/pwa.ts
```ts
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
})
```
:::

### Prompt for Update

The best place to register the `ReloadPrompt` component will be in the main layout of the application (you should register it in any layout):

::: details src/layouts/Layout.astro
```astro
---
import { pwaInfo } from 'virtual:pwa-info';
import ReloadPrompt from '../components/ReloadPrompt.astro';

export interface Props {
  title: string;
}

const { title } = Astro.props as Props;
---
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/pwa-192x192.png">
    <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF">
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="theme-color" content="#ffffff">
    <title>{title}</title>
    <meta name="description" content={title}>
    <style>
    main, footer {
        text-align: center;
    }
    </style>
    { pwaInfo && <Fragment set:html={pwaInfo.webManifest.linkTag} /> }
  </head>
  <body>
    <main>
        <article>
            <slot />
        </article>
    </main>
    <ReloadPrompt />
  </body>
</html>
```
:::

::: details src/components/ReloadPrompt.astro
```astro
<script src="./pwa.ts"></script>
<div
    id="pwa-toast"
    role="alert"
    aria-labelledby="toast-message"
>
    <div class="message">
      <span id="toast-message"></span>
    </div>
    <button id="pwa-refresh">
      Reload
    </button>
    <button id="pwa-close">
      Close
    </button>
</div>

<style>
#pwa-toast {
  visibility: hidden;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
#pwa-toast .message {
  margin-bottom: 8px;
}
#pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
#pwa-toast.show {
  visibility: visible;
}
button#pwa-refresh {
  display: none;
}
#pwa-toast.show.refresh button#pwa-refresh {
  display: inline-block;
}
</style>
```
:::

::: details src/components/pwa.ts
```ts
import { registerSW } from 'virtual:pwa-register'

window.addEventListener('load', () => {
  const pwaToast = document.querySelector<HTMLDivElement>('#pwa-toast')!
  const pwaToastMessage = pwaToast.querySelector<HTMLDivElement>('.message #toast-message')!
  const pwaCloseBtn = pwaToast.querySelector<HTMLButtonElement>('#pwa-close')!
  const pwaRefreshBtn = pwaToast.querySelector<HTMLButtonElement>('#pwa-refresh')!

  let refreshSW: ((reloadPage?: boolean) => Promise<void>) | undefined

  const refreshCallback = () => refreshSW?.(true)

  const hidePwaToast = (raf = false) => {
    if (raf) {
      requestAnimationFrame(() => hidePwaToast(false))
      return
    }
    if (pwaToast.classList.contains('refresh'))
      pwaRefreshBtn.removeEventListener('click', refreshCallback)

    pwaToast.classList.remove('show', 'refresh')
  }
  const showPwaToast = (offline: boolean) => {
    if (!offline)
      pwaRefreshBtn.addEventListener('click', refreshCallback)
    requestAnimationFrame(() => {
      hidePwaToast(false)
      if (!offline)
        pwaToast.classList.add('refresh')
      pwaToast.classList.add('show')
    })
  }

  pwaCloseBtn.addEventListener('click', () => hidePwaToast(true))

  refreshSW = registerSW({
    immediate: true,
    onOfflineReady() {
      pwaToastMessage.innerHTML = 'App ready to work offline'
      showPwaToast(true)
    },
    onNeedRefresh() {
      pwaToastMessage.innerHTML = 'New content available, click on reload button to update'
      showPwaToast(false)
    },
    onRegisteredSW(swScriptUrl) {
      console.log('SW registered: ', swScriptUrl)
    }
  })
})
```
:::

### Using Application UI Framework

If you're using some Application UI Framework in your Astro application, you can use/import the corresponding PWA plugin virtual module:
- [Vue 3](/frameworks/vue)
- [React](/frameworks/react)
- [Svelte](/frameworks/svelte)
- [SolidJS](/frameworks/solidjs)
- [Preact](/frameworks/preact)

Check also the documentation for [Astro Frameworks Components](https://docs.astro.build/en/core-concepts/framework-components/) for more information.

## Navigation Fallback

If you have a `404` route, you can use it as the fallback navigation for your service worker.

When using `generateSW` strategy, configure the `404` route in the `workbox` pwa integration option:

```ts
AstroPWA({
  workbox: { navigateFallback: '/404' }
})
```

If you are using `injectManifest` strategy, configure the `404` route in the navigation fallback in your custom service worker:

```ts
registerRoute(new NavigationRoute(createHandlerBoundToURL('/404')))
```
## Experimental

### Directory and Trailing Slash Handler

Check the problem in the following issue: https://github.com/vite-pwa/astro/issues/23.

You can find a list of hosts and how they handle trailing slash in this [repository](https://github.com/slorber/trailing-slash-guide).

To enable this feature, you need to add the following configuration to your PWA options:
```ts
import { defineConfig } from 'astro/config'
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    AstroPWA({
      experimental: {
        directoryAndTrailingSlashHandler: true,
      }
    })
  ]
})
```

If you're using `injectManifest` strategy, you also need to include `directoryIndex` and optionally `cleanURLs` in your custom service worker in the precaching controller:
```ts
import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST, { directoryIndex: 'index.html', cleanURLs: true })
```

## PWA Assets <Badge text="Experimental" type="tip"/> <Badge type="tip" text="from v0.3.0" />

`@vite-pwa/astro` plugin will configure `integration` option properly. We suggest you to use external configuration file, Astro dev server will not be restarted when changing the configuration.

To inject the PWA icons links and the `theme-color`, you can use the `virtual:pwa-assets/head` virtual module in your layout components:
- remove all links with rel `icon`, `apple-touch-icon` and `apple-touch-startup-image` from your html head
- remove the `theme-color` meta tag from your html head
- add the virtual import
- include theme color and icons links using code-snippet shown below

```astro
---
import { pwaAssetsHead } from 'virtual:pwa-assets/head';
---
<html lang="en">
  <head>
    { pwaAssetsHead.themeColor && <meta name="theme-color" content={pwaAssetsHead.themeColor.content} /> }
    { pwaAssetsHead.links.map(link => (
        <link {...link} />
    )) }
  </head>
</html>
```

You can find a working example in the [examples folder](https://github.com/vite-pwa/astro/tree/main/examples/pwa-simple-assets-generator).
