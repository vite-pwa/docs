---
title: Integrations | PWA Assets 生成器
outline: deep
---

# Integrations <Badge text="Experimental" type="tip"/>

Starting with `v0.19.0`, `vite-plugin-pwa` provides experimental support for the following `@vite-pwa/assets-generator` integrations for serving, generating, and injecting PWA assets on the fly:

- Inlined or external file configuration support
- Generate PWA assets on demand in dev server and build from single image file
- Auto-inject PWA assets in your HTML entry point
- Auto-inject `theme-color` meta tag in your HTML entry point, it will be extracted from your web manifest `theme_color` property
- Auto-inject web manifest icons

The new experimental feature must be enabled explicitly in your `vite-plugin-pwa` configuration with the `pwaAssets` option. This can be done by either:

- using an inlined preset or
- using an external configuration file (will take precedence over inlined preset)

You can find a working example in the [examples/assets-generator](https://github.com/vite-pwa/vite-plugin-pwa/tree/main/examples/assets-generator) folder.

:::warning
This feature is experimental and is subject to (potentially breaking) changes without notice. Please [file a GitHub Issue](https://github.com/vite-pwa/vite-plugin-pwa/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for any bugs you may find.
:::

## 安装

To use the new feature, install the `@vite-pwa/assets-generator` package as a dev dependency:

::: code-group
```bash [pnpm]
pnpm add -D @vite-pwa/assets-generator
```
```bash [yarn]
yarn add -D @vite-pwa/assets-generator
```
```bash [npm]
npm install -D @vite-pwa/assets-generator
```
:::

## Configuration

We recommend using an external `pwa-assets.config.js` or `pwa-assets.config.ts` file.
The `vite-plugin-pwa` plugin will watch it for changes to avoid dev server restarts.
You can still use inline inside your `vite.config.js` file. This will cause Vite to restart the dev server when changing any option.

To use the new feature, you only need to configure the new `pwaAssets` option in your PWA configuration:

```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      // other pwa options

      // pwa assets
      pwaAssets: {
        // options
      }
    })
  ]
})
```

Check the [PWA Assets Options](#pwa-assets-options) section for further details.

## Integrations

### îles <Badge text="WIP" type="warning"/>

WIP

### SvelteKit <Badge type="tip" text="from v0.19.0" />

`@vite-pwa/sveltekit` plugin will configure `integration` option properly. We suggest you to use external configuration file, SvelteKit dev server will not be restarted when changing the configuration.

Check the [SvelteKit PWA Assets](/frameworks/sveltekit#pwa-assets) section for more details.

### VitePress <Badge type="tip" text="from v0.19.0" />

`@vite-pwa/vitepress` plugin will configure `integration` option properly. VitePress dev server will be restarted when changing the configuration (inlined or using external file).

Check the [VitePress PWA Assets](/frameworks/vitepress#pwa-assets) section for more details.

### Astro <Badge type="tip" text="from v0.3.0" />

`@vite-pwa/astro` plugin will configure `integration` option properly. We suggest you to use external configuration file, Astro dev server will not be restarted when changing the configuration.

Check the [Astro PWA Assets](/frameworks/astro#pwa-assets) section for more details.

### Nuxt 3 <Badge type="tip" text="from v0.6.0" />

`@vite-pwa/nuxt` plugin will configure `integration` option properly. Nuxt dev server will be restarted when changing the configuration (inlined or using external file).

Check the [Nuxt 3 PWA Assets](/frameworks/nuxt#pwa-assets) section for more details about new components, composables and injections.

### Remix

Vite dev server will be restarted when changing the configuration (inlined or using external file).

Check the [Remix PWA Assets](/frameworks/remix#pwa-assets) section for more details about the components.

## New Virtual Modules

`vite-plugin-pwa` plugin exposes two new virtual modules for the integrations, they are not meant to be consumed from your application:

- `virtual:pwa-assets/head`: will expose PWA image links and the `theme-color` meta tag
- `virtual:pwa-assets/icons`: will expose PWA web manifest icons

If you're using TypeScript in your application, you can add `vite-plugin-pwa/pwa-assets` to your `tsconfig.json` file to avoid TypeScript errors:
```json
{
  "compilerOptions": {
    "types": [
      "vite-plugin-pwa/pwa-assets"
    ]
  }
}
```

You can also add the following reference to the beginning of your application code:

```ts
/// <reference types="vite-plugin-pwa/pwa-assets" />
```

You can find the virtual modules types in the [pwa-assets.d.ts](https://github.com/vite-pwa/vite-plugin-pwa/tree/main/pwa-assets.d.ts) file.

## PWA Assets Options

```ts
/**
 * PWA assets generation and injection options.
 */
export interface PWAAssetsOptions {
  /**
   * Enable PWA assets generation and injection.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * PWA assets generation and injection.
   *
   * By default, the plugin will search for the pwa assets generator configuration file in the root directory of your project:
   * - pwa-assets.config.js
   * - pwa-assets.config.mjs
   * - pwa-assets.config.cjs
   * - pwa-assets.config.ts
   * - pwa-assets.config.cts
   * - pwa-assets.config.mts
   *
   * If using a string path, it should be relative to the root directory of your project.
   *
   * Setting to `false` will disable config resolving.
   *
   * **WARNING**: You can use only one image in the configuration file.
   *
   * @default false
   * @see https://vite-pwa-org.netlify.app/assets-generator/cli.html#configurations
   */
  config?: string | boolean

  /**
   * Preset to use.
   *
   * If the `config` option is enabled, this option will be ignored.
   *
   * Setting this option to `false` will disable PWA assets generation (if the `config` option is also disabled).
   *
   * @default 'minimal-2023'
   */
  preset?: false | BuiltInPreset | Preset

  /**
   * Path relative to `root` folder where to find the image to use for generating PWA assets.
   *
   * If the `config` option is enabled, this option will be ignored.
   *
   * @default `public/favicon.svg`
   */
  image?: string

  /**
   * The preset to use for head links (favicon links).
   *
   * If `config` option is enabled, this option will be ignored.
   *
   * @see https://vite-pwa-org.netlify.app/assets-generator/#preset-minimal-2023
   * @see https://vite-pwa-org.netlify.app/assets-generator/#preset-minimal
   * @default '2023'
   */
  htmlPreset?: HtmlLinkPreset

  /**
   * Should the plugin include html head links?
   *
   * @default true
   */
  includeHtmlHeadLinks?: boolean

  /**
   * Should the plugin override the PWA web manifest icons' entry?
   *
   * The plugin will auto-detect the icons from the manifest, if missing, then the plugin will ignore this option and will include the icons.
   *
   * @default false
   */
  overrideManifestIcons?: boolean

  /**
   * Should the PWA web manifest `theme_color` be injected in the html head?
   *
   * @default true
   */
  injectThemeColor?: boolean

  /**
   * PWA Assets integration support.
   *
   * This option should be only used by integrations, it is not meant to be used by end users.
   */
  integration?: {
    /**
     * The base url for the PWA assets.
     *
     * @default `vite.base`
     */
    baseUrl?: string

    /**
     * The public directory to resolve the image: should be an absolute path.
     *
     * @default `vite.root/vite.publicDir`
     */
    publicDir?: string

    /**
     * The output directory: should be an absolute path.
     *
     * @default `vite.root/vite.build.outDir`
     */
    outDir?: string
  }
}
```
