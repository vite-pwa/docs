---
title: Integrations | PWA Assets Generator
---

# Integrations <Badge text="Experimental" type="tip"/>

From `v0.18.1`, `vite-plugin-pwa` adds experimental support for `@vite-pwa/assets-generator` for serving, generate and inject PWA assets on the fly:
- inlined or external file configuration support
- generate PWA assets on demand in dev server and build from single image file
- auto-inject PWA assets in your HTML entry point
- auto-inject `theme-color` meta tag in your HTML entry point, it will be extracted from your web manifest `theme_color` property
- auto-inject web manifest icons

The new experimental feature must be enabled explicitly in your PWA configuration via `pwaAssets` option:
- using inlined preset or
- using external configuration file (will take precedence over inlined preset)

It should be used only with `vite-plugin-pwa` plugin, it is not yet supported in other integrations (may or may not work, not yet tested), we'll add support soon.

This feature is experimental, it may change (with or without breaking changes) in the future without notice, please report any issues you find.

You can find a working example in the [examples/assets-generator](https://github.com/vite-pwa/vite-plugin-pwa/tree/main/examples/assets-generator) folder.

## Configuration

We suggest you using external configuration file, `vite-plugin-pwa` plugin will watch it for changes, avoiding dev server restarts. If you use inlined configuration, Vite will restart the dev server when changing any option.

```ts
/**
 * PWA assets generation and injection options.
 */
export interface PWAAssetsOptions {
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
   * If `config` option is enabled, this option will be ignored.
   *
   * Setting to `false` will disable PWA assets generation if `config` option disabled.
   *
   * @default 'minimal-2023'
   */
  preset?: false | BuiltInPreset | Preset
  /**
   * Path relative to `root` folder where to find the image to use for generating PWA assets.
   *
   * If `config` option is enabled, this option will be ignored.
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
}
```

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

## îles

WIP

## SvelteKit

WIP

## VitePress

WIP

## Astro

WIP

## Nuxt 3

WIP

## Qwik

Check the [@qwikdev/pwa](https://github.com/QwikDev/pwa) repository for more details.
