---
title: Breaking Changes | Guide
outline: deep
---

# Breaking Changes

Please refer to the corresponding installation section:
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa#-install)
- [@vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit#-install)
- [@vite-pwa/vitepress](https://github.com/vite-pwa/vitepress#-install)
- [@vite-pwa/astro](https://github.com/vite-pwa/astro#-install)
- [@vite-pwa/nuxt](https://github.com/vite-pwa/nuxt#-install)
- [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator#-install)

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

From version `v0.3.3`, `@vite-pwa/nuxt` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the Nuxt's [app.buildAssetsDir](https://nuxt.com/docs/api/nuxt-config#buildassetsdir) option (defaults to `_nuxt`).

## @vite-pwa/astro

From version `v0.2.0`, `@vite-pwa/astro` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the Astro's [build.assets](https://docs.astro.build/en/reference/configuration-reference/#buildassets) option (defaults to `_astro`).

## Other integrations

If you're using `vite-plugin-pwa` or another integration with other meta frameworks (îles, SvelteKit), review the generated service worker if you're using Vite 5 or Rollup 4, and update the `dontCacheBustURLsMatching` regular expression properly when required.
