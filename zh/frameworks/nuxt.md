---
title: Nuxt 3 | Frameworks
outline: deep
---

# Nuxt 3

<ChangeLog />

::: warning
This PWA module can only be used with Vite.
:::

## Nuxt 3 Integration

`vite-plugin-pwa` provides the new `@vite-pwa/nuxt` module that will allow you to use `vite-plugin-pwa` in your Nuxt 3 applications.

You will need to install `@vite-pwa/nuxt` using:
```shell
npx nuxi@latest module add @vite-pwa/nuxt
```

To update your project to use the new `@vite-pwa/nuxt` module for Nuxt 3, you only need to change the Nuxt config file adding the `@vite-pwa/nuxt` module, move the `vite-plugin-pwa` options to the module options, and remove the `vite-pwa-plugin` plugin (if present):

```ts
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    /* your pwa options */
  }
})
```

## Using Nuxt 3 Plugin

`@vite-pwa/nuxt` will register a plugin that will provide PWA logic via `$pwa` property when the PWA is enabled (`$pwa` will be `undefined` if PWA disabled or running dev server without PWA dev options enabled).

You can access `$pwa` property directly inside your Vue component templates. You can also access to `$pwa` in your Vue script setup or in any other module via `useNuxtApp().$pwa`.

The module will provide the following features via `$pwa` property:
- Prompt for update and offline ready via `needRefresh` and `offlineReady` properties.
- Cancelling prompt for update application and offline via `closePrompt` function.
- Update application when using `prompt for update` behaviour via `updateServiceWorker` function.
- Intercepting `beforeinstallprompt` event via `showInstallPrompt` property: this feature will prevent the browser to show the default `Install PWA Application` prompt.
- Cancelling install prompt via `cancelInstall` function.
- `Install PWA application` via `install` function.
- Service worker registration status via `swActivated` and `registrationError` properties.
- Service worker registration via `getSWActivated` function.

You will need to activate `pwa.client.installPrompt` property in your Nuxt config file to enable `beforeinstallprompt` event interception: configure `true` or the key name used in local storage to store the `beforeinstallprompt` cancellation for your install prompt/widget.

Additionally, you can also configure periodic sync for updates, you can enable it via `pwa.periodicSyncForUpdates` property in your Nuxt config file: configure the interval in seconds in previous property.

You can disable this plugin by setting `pwa.client.registerPlugin` property to `false` in your Nuxt config file. In that case, you will need to import `VanillaJS` or `Vue` PWA virtual module in your application, and previous features will not be available (you can only access to the features exposed by the virtual module).

::: info
This is the initial release of `@vite-pwa/nuxt` integration, we're working to improve it and add more features.
:::

### PWA 安装 Status <Badge type="tip" text="from v0.3.5+" />

`@vite-pwa/nuxt` provides the new `$pwa?.isPWAInstalled` reactive property to check if your PWA application is installed.

## Registering Web Manifest

To register the PWA web manifest in your Nuxt 3 application, `@vite-pwa/nuxt` provides the functional components `VitePwaManifest` and `NuxtPwaManifest`, you should add one of them to your `app.vue` or to all of your layouts (add only `VitePwaManifest` or `NuxtPwaManifest`).

::: tip
You can enable `registerWebManifestInRouteRules` property in PWA configuration to register the web manifest in Nitro `routeRules` property: useful for example if your application is deployed to Netlify.
:::

## Payload Extraction <Badge type="tip" text="from v0.3.1+" /> <Badge type="info" text="offline support" />

When you enable the experimental `payloadExtraction` flag in your Nuxt configuration file, `@vite-pwa/nuxt` will add `**/_payload.json` to the `globPatterns` array inside `workbox` or `injectManifest` option, depending on the configured  `strategy`.

## App Manifest <Badge type="tip" text="from v0.3.1+" /> <Badge type="tip" text="from Nuxt v3.8+" /> <Badge type="info" text="offline support" />

When you enable the experimental `appManifest` flag in your Nuxt configuration file, `@vite-pwa/nuxt` will:
- add `_nuxt/builds/**/*.json` to the `globPatterns` array inside `workbox` or `injectManifest` option, depending on the configured  `strategy`
- remove `revision` entry from all service worker precache manifest files inside `_nuxt/builds/` folder  matching `<UUID>.json` pattern ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) is a random generated string by Nuxt).

## TypeScript

```ts
export interface PwaInjection {
  /**
   * @deprecated use `isPWAInstalled` instead
   */
  isInstalled: boolean
  /**
   * From version v0.3.5+. 
   */  
  isPWAInstalled: Ref<boolean>
  showInstallPrompt: Ref<boolean>
  cancelInstall: () => void
  install: () => Promise<void>
  swActivated: Ref<boolean>
  registrationError: Ref<boolean>
  offlineReady: Ref<boolean>
  needRefresh: Ref<boolean>
  updateServiceWorker: (reloadPage?: boolean | undefined) => Promise<void>
  cancelPrompt: () => Promise<void>
  getSWRegistration: () => ServiceWorkerRegistration | undefined
}

declare module '#app' {
  interface NuxtApp {
    $pwa: UnwrapNestedRefs<PwaInjection>
  }
}
```

## Examples

### VitePwaManifest/NuxtPwaManifest in app.vue

When adding `VitePwaManifest` or `NuxtPwaComponent` component to your `app.vue`:
```vue
<template>
  <VitePwaManifest />
  <NuxtPage />
</template>
```

or

```vue
<template>
  <NuxtPwaManifest />
  <NuxtPage />
</template>
```

then, the web manifest link will be added to your HTML pages:
```html
<html>
<head>
    <link rel="manifest" href="/manifest.webmanifest">
</head>
</html>
```

### Prompt for update and offline ready

```vue
<script setup>
// If you want to use it in setup, import from the nuxtApp.
const { $pwa } = useNuxtApp()

const toast = useToast()

onMounted(() => {
  if ($pwa.offlineReady)
    toast.success('App ready to work offline')
})
</script>

<template>
  <!-- You can use $pwa directly in templates! -->
  <div v-show="$pwa.needRefresh">
    <span>
      New content available, click on reload button to update.
    </span>

    <button @click="$pwa.updateServiceWorker()">
      Reload
    </button>
  </div>
</template>
```

## PWA Assets <Badge text="Experimental" type="tip"/> <Badge type="tip" text="from v0.6.0" />

This new feature includes:
- new `NuxtPwaAssets` component to include the PWA assets in your HTML pages: if you're using `VitePwaManifest` or `NuxtPwaManifest` component, replace it with `NuxtPwaAssets`: it will inject the web manifest link, the `theme-color` meta and the PWA icon links.
- new `PwaAppleImage`, `PwaAppleSplashScreenImage`, `PwaFaviconImage`, `PwaMaskableImage` and `PwaTransparentImage` components to use PWA icons in your code base
- new `useApplePwaIcon`, `useAppleSplashScreenPwaIcon`, `useFaviconPwaIcon`, `useMaskablePwaIcon` and `useTransparentPwaIcon` composables
- injects `$pwaIcons` with all configured PWA icons: you can use them via `useNuxtApp().$pwaIcons` or inside your Vue templates

New components, composables and `$pwaIcons` injection are statically analisable, that's, pwa icons types are generated when running `nuxt prepare` command: if you want to disable the PWA assets you don't need to remove the code (you can remove unused components/code later if you want to remove the new feature).
