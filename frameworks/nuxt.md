---
title: Nuxt 3 | Frameworks
next: Getting Started | Examples
---

# Nuxt 3

::: warning
This PWA module can only be used with Vite.
:::

## Nuxt 3 Integration

`vite-plugin-pwa` provides the new `@vite-pwa/nuxt` module that will allow you to use `vite-plugin-pwa` in your Nuxt 3 applications.

You will need to install `@vite-pwa/nuxt` using:
::: code-group
  ```bash [pnpm]
  pnpm add -D @vite-pwa/nuxt
  ```
  ```bash [yarn]
  yarn add -D @vite-pwa/nuxt
  ```
  ```bash [npm]
  npm install -D @vite-pwa/nuxt
  ```
:::

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

You will need to activate `pwa.installPrompt` property in your Nuxt config file to enable `beforeinstallprompt` event interception: configure `true` or the key name used in local storage to store the `beforeinstallprompt` cancellation for your install prompt/widget.

Additionally, you can also configure periodic sync for updates, you can enable it via `pwa.periodicSyncForUpdates` property in your Nuxt config file: configure the interval in seconds in previous property.

You can disable this plugin by setting `pwa.client.registerPlugin` property to `false` in your Nuxt config file. In that case, you will need to import `VanillaJS` or `Vue` PWA virtual module in your application, previous properties will not be available.

::: info
This is the initial release of `@vite-pwa/nuxt` integration, we're working to improve it and add more features.
:::

## Registering Web Manifest

To register the PWA web manifest in your Nuxt 3 application, `@vite-pwa/nuxt` provides `VitePwaManifest.ts` functional component, you should add it to your `app.vue` or to all layouts files.

::: tip
You can enable `registerWebManifestInRouteRules` property in PWA configuration to register the web manifest in Nitro `routeRules` property: useful for example if your application is deployed to Netlify.
:::

## TypeScript

```ts
export interface PwaInjection {
  isInstalled: boolean
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
