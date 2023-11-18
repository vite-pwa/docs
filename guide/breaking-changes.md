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

Rollup 4 has changed the asset name layout format, it is using `base64` encoding, previous Rollup versions using `hex` encoding:
- [Using more characters can make the hash length shorter](https://github.com/rollup/rollup/issues/4803)
- [Using a faster hash algorithm can make hashing faster](https://github.com/rollup/rollup/issues/4626)
- This is the PR that changed the hash algorithm: https://github.com/rollup/rollup/pull/5155

This change breaks the way `vite-plugin-pwa` build plugin builds the service worker, since it is using this regular expression `/[.-][a-f0-9]{8}\./` for [dontCacheBustURLsMatching](https://developer.chrome.com/docs/workbox/reference/workbox-build/) in `workbox` and `injectManifest` options.

In version `v0.17.0`, `vite-plugin-pwa` configures `dontCacheBustURLsMatching` with a regular expression using the Vite's [build.assetsDir](https://vitejs.dev/config/build-options.html#build-assetsdir) option (defaults to `assets`):
- `workbox.dontCacheBustURLsMatching = /^assets\//`
- `injectManifest.dontCacheBustURLsMatching = /^assets\//`

You can refer to this issue for more details about `dontCacheBustURLsMatching`: [Workbox appears to be needlessly generating revision hashes](https://github.com/vite-pwa/vite-plugin-pwa/issues/163). 

## @vite-pwa/vitepress

In version `v0.3.0`, `@vite-pwa/vitepress` configures `dontCacheBustURLsMatching` in a similar way to how `vite-plugin-pwa` does, but using the VitePress' [assetsDir](https://vitepress.dev/reference/site-config#assetsdir) option.

## Other integrations

If you're using `vite-plugin-pwa` or another integration with other meta frameworks (îles, Astro, SvelteKit, Nuxt 3), review the generated service worker if you're using Vite 5 or Rollup 4, and update the `dontCacheBustURLsMatching` regular expression properly.
