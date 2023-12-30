---
title: Change Log | Guide
outline: deep
---

# Change Log

Please refer to the corresponding installation section:
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa#-install)
- [@vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit#-install)
- [@vite-pwa/vitepress](https://github.com/vite-pwa/vitepress#-install)
- [@vite-pwa/astro](https://github.com/vite-pwa/astro#-install)
- [@vite-pwa/nuxt](https://github.com/vite-pwa/nuxt#-install)
- [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator#-install)

## New Vite Build <Badge type="tip" text="from v0.18.0+" />

From `v0.18.0`, `vite-plugin-pwa` adds four new options to `injectManifest` option to allow customizing the service worker build output:
- `target`: you can change the `target` build, the plugin will use the Vite's [build.target](https://vitejs.dev/config/build-options.html#build-target) option if not configured
- `minify`: you can change the `minify` build, the plugin will use the Vite's [build.minify](https://vitejs.dev/config/build-options.html#build-minify) option if not configured
- `sourcemap`: you can change the `sourcemap` build, the plugin will use the Vite's [build.sourcemap](https://vitejs.dev/config/build-options.html#build-sourcemap) option if not configured
- `enableWorkboxModulesLogs`: you can enable/disable the `workbox` modules log for a development or production build, by default, the plugin will use `process.env.NODE_ENV` (Workbox modules logs logic will be removed from the service worker in `production` build: dead code elimination)

The new Vite build will allow you to use [.env Files](https://vitejs.dev/guide/env-and-mode.html#env-files), the `mode` option in your PWA configuration will not be used when using `injectManifest` strategy, the plugin will use the Vite's [mode](https://vitejs.dev/config/#mode) option instead:
- use `import.meta.env.MODE` to access the Vite mode inside your service worker.
- use `import.meta.env.DEV` or `import.meta.env.PROD` to check if the service worker is running on development or production (equivalent to `process.env.NODE_ENV`), check Vite [NODE_ENV and Modes](https://vitejs.dev/guide/env-and-mode#node-env-and-modes) docs.

::: tip
If you are using TypeScript in your service worker accessing `import.meta.env` variables, if TypeScript complains, add the following reference to the beginning of your service worker code:
```ts
/// <reference types="vite/client" />
```
:::

## Rollup 4 and Vite 5

Rollup 4 has changed the asset name layout format, it is using `ascii` letters (no encoding, including also dash and underscore), previous Rollup versions are using `hex` encoding:
- [Using more characters can make the hash length shorter](https://github.com/rollup/rollup/issues/4803)
- [Using a faster hash algorithm can make hashing faster](https://github.com/rollup/rollup/issues/4626)
- This is the PR that changed the hash algorithm: https://github.com/rollup/rollup/pull/5155

This change breaks the way `vite-plugin-pwa` build plugin builds the service worker, since it is using this regular expression `/[.-][a-f0-9]{8}\./` for [dontCacheBustURLsMatching](https://developer.chrome.com/docs/workbox/reference/workbox-build/) in `workbox` and `injectManifest` options.

From version `v0.17.0`, `vite-plugin-pwa` configures `dontCacheBustURLsMatching` with a regular expression using the Vite's [build.assetsDir](https://vitejs.dev/config/build-options.html#build-assetsdir) option (defaults to `assets`):
- `workbox.dontCacheBustURLsMatching = /^assets\//`
- `injectManifest.dontCacheBustURLsMatching = /^assets\//`

You can refer to this issue for more details about `dontCacheBustURLsMatching`: [Workbox appears to be needlessly generating revision hashes](https://github.com/vite-pwa/vite-plugin-pwa/issues/163). 

## @vite-pwa/vitepress

From version `v0.3.0`, `@vite-pwa/vitepress` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the VitePress' [assetsDir](https://vitepress.dev/reference/site-config#assetsdir) option (defaults to `assets`).

## @vite-pwa/nuxt

From version `v0.4.0`, `@vite-pwa/nuxt` requires Vite 5 and Nuxt 3.9+.

From version `v0.3.3`, `@vite-pwa/nuxt` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the Nuxt's [app.buildAssetsDir](https://nuxt.com/docs/api/nuxt-config#buildassetsdir) option (defaults to `_nuxt`).

## @vite-pwa/astro

From version `v0.2.0`, `@vite-pwa/astro` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the Astro's [build.assets](https://docs.astro.build/en/reference/configuration-reference/#buildassets) option (defaults to `_astro`).

## @vite-pwa/sveltekit

From version `v0.3.0`, `@vite-pwa/sveltekit` supports SvelteKit 2 (should also support SvelteKit 1).

From version `v0.2.9`, `@vite-pwa/sveltekit` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the Sveltkit's [appDir](https://kit.svelte.dev/docs/configuration#appdir) option (defaults to `_app`).

::: warning
From version `v0.2.0`, `SvelteKitPWA` plugin requires SvelteKit 1.3.1 or above.

If you're using a SvelteKit version prior to `v1.3.1`, you should use `SvelteKitPWA` plugin version `0.1.*`.
:::

## Other integrations

If you're using `vite-plugin-pwa` or another integration with other meta frameworks (îles), review the generated service worker if you're using Vite 5 or Rollup 4, and update the `dontCacheBustURLsMatching` regular expression properly when required.
