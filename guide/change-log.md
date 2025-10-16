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
- [@vite-pwa/create-pwa](https://github.com/vite-pwa/create-pwa#-usage)

You can check the release notes to see the corresponding changes:
- [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa/releases)
- [@vite-pwa/sveltekit](https://github.com/vite-pwa/sveltekit/releases)
- [@vite-pwa/vitepress](https://github.com/vite-pwa/vitepress/releases)
- [@vite-pwa/astro](https://github.com/vite-pwa/astro/releases)
- [@vite-pwa/nuxt](https://github.com/vite-pwa/nuxt/releases)
- [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator/releases)
- [@vite-pwa/create-pwa](https://github.com/vite-pwa/create-pwa/releases)

## @vite-pwa/create-pwa <Badge type="tip" text="from v1.0.0" />

From version `v1.0.0`, all the templates to use Vite 7, including also the latest frameworks changes.

## @vite-pwa/create-pwa <Badge type="tip" text="from v0.6.0" />

From version `v0.6.0`, all the templates to use Vite 6, including also the latest frameworks changes.

Use version `v0.5.0` for Vite 5 and previous versions of the frameworks.

## SvelteKit Single-page App Support <Badge type="tip" text="from v0.6.7" />

From `v0.6.7`, `@vite-pwa/sveltekit` adds support for [single-page apps](https://svelte.dev/docs/kit/single-page-apps), including also:
- add `static-adapter` fallback in the service worker precache manifest in SPA mode
- update `globPatterns` to include `__data.json` files when using `static-adapter` with `load` functions

Check the [SvelteKit documentation](/frameworks/sveltekit) for further details.

## Vite 6 support <Badge type="tip" text="from v0.21.1" />

From `v0.21.1`, `vite-plugin-pwa` adds support for Vite 6:
- should also work with Vite 3, 4 and 5.
- still not using the Vite 6 [Environment API](https://vite.dev/guide/api-environment).

If you want to use `vite-plugin-pwa` with Vite 6 [Environment API](https://vite.dev/guide/api-environment), check this PR: [feat!: add Vite 6 Environment API support](https://github.com/vite-pwa/vite-plugin-pwa/pull/786): install the `vite-plugin-pwa` version from `pkg-pr-new` using the last commit (click on the commit link in the [pkg-pr-new comment](https://github.com/vite-pwa/vite-plugin-pwa/pull/786#issuecomment-2478777537) ):

::: code-group
  ```bash [pnpm]
  pnpm add -D https://pkg.pr.new/vite-plugin-pwa@88b2e45
  ```
  ```bash [yarn]
  yarn add -D https://pkg.pr.new/vite-plugin-pwa@88b2e45
  ```
  ```bash [npm]
  npm i -D https://pkg.pr.new/vite-plugin-pwa@88b2e45
  ```
:::

::: info
`vite-plugin-pwa` should still work with Vite 3, 4 and 5.
:::

## Workbox 7.3.0 <Badge type="tip" text="from v0.21.0" />

From `v0.21.0`, `vite-plugin-pwa` updates `workbox` to `7.3.0`.

## Workbox 7.3.0 <Badge type="tip" text="from v0.21.0" />

From `v0.21.0`, `vite-plugin-pwa` updates `workbox` to `7.3.0`.

## Service worker build <Badge type="tip" text="from v0.20.2" />

From `v0.20.2`, the plugin will throw an error if the `maximumFileSizeToCacheInBytes` warning is present when building the service worker.

## Workbox 7.1.0 <Badge type="tip" text="from v0.20.0" />

From `v0.20.0`, `vite-plugin-pwa` updates `workbox` to `7.1.0`.

Workbox has deprecated [workbox-google-analytics](https://developer.chrome.com/docs/workbox/modules/workbox-google-analytics/), it is not compatible with newer Google Analytics v4.

## Updated Vite Build <Badge type="tip" text="from v0.19.6" />

**These new features are meant to be used only from integrations.**

From `v0.19.6`, `vite-plugin-pwa` adds `envOptions` option to `injectManifest` to allow customizing the environment options for the service worker build output:
- `envDir`: you can change the `envDir`, the plugin will use the Vite's [envDir](https://vitejs.dev/config/shared-options.html#envdir) option if not configured
- `envPrefix`: you can change the `envPrefix`, the plugin will use the Vite's [envDir](https://vitejs.dev/config/shared-options.html#envprefix) option if not configured

`vite-plugin-pwa` also includes the new `configureCustomSWViteBuild` integration option to allow you to change the Vite's build options for the custom service worker build, check the [PWAIntegration type](https://github.com/vite-pwa/vite-plugin-pwa/blob/main/src/types.ts) definition for more details.

## PWA Assets <Badge type="tip" text="from v0.19.0" /> <Badge type="warning" text="experimental" />

From `v0.19.0`, `vite-plugin-pwa` adds experimental support for `@vite-pwa/assets-generator` to serve, generate and inject PWA assets on the fly.

Check the [PWA Assets Generator Integrations](/assets-generator/integrations) section for more details.

## New Vite Build <Badge type="tip" text="from v0.18.0" />

<InjectManifestBuild />

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

From version `v0.3.1`, you can use `import.meta.env.PUBLIC_` variables in your custom service worker when configured using [.env files](https://docs.astro.build/en/guides/environment-variables/#setting-environment-variables).

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
