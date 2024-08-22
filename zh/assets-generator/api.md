---
title: API | PWA Assets 生成器
outline: deep
---

# PWA Assets 生成器 API

From `v0.2.0`, `@vite-pwa/assets-generator` is shipped with a CLI, an API (low-level api): refer to [API](#api) for more details.

The API can be found in the [api folder](https://github.com/vite-pwa/assets-generator/tree/main/src/api).

## 安装

This package is shipped with the `@vite-pwa/assets-generator` package:

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

## API

From version `v0.2.0`, `@vite-pwa/assets-generator` exposes the following packages:
- `@vite-pwa/assets-generator/api`: low-level functions api.
- new `@vite-pwa/assets-generator/api/instructions`: `instructions` function to collect the icon assets instructions.
- new `@vite-pwa/assets-generator/api/generate-assets`: `generateAssets` function to generate icon assets from an instruction.
- new `@vite-pwa/assets-generator/api/generate-html-markup`: `generateHtmlMarkup` function to generate all html head links from an instruction.
- new `@vite-pwa/assets-generator/api/generate-manifest-icons-entry`: `generateManifestIconsEntry` function to generate the PWA web manifest icons' entry.

The API can be found in the [api folder](https://github.com/vite-pwa/assets-generator/tree/main/src/api) and the [JSDOCS documentation](https://paka.dev/npm/@vite-pwa/assets-generator).

If you need to generate the PWA assets from your own code, you can use the `instructions`, `generateHtmlMarkup`, `generateAssets` and `generateManifestIconsEntry` functions:
1) [instructions](https://github.com/vite-pwa/assets-generator/tree/main/src/api/instructions.ts): collect the icon assets instructions, provides function helpers to generate each icon asset as a `Buffer` and html head links with `string` and `object` notation.
2) [generateAssets](https://github.com/vite-pwa/assets-generator/tree/main/src/api/generate-assets.ts): once you collect the icon assets instructions, you can use this function to save all the icon assets to the file system.
3) [generateHtmlMarkup](https://github.com/vite-pwa/assets-generator/tree/main/src/api/generate-html-markup.ts): once you collect the icon assets instructions, you can use this function to generate all the html head markup for the icon assets.
4) [generateManifestIconsEntry](https://github.com/vite-pwa/assets-generator/tree/main/src/api/generate-manifest-icons-entry.ts) function to generate the PWA web manifest icons' entry.

::: info
We're working to expose the new api in `vite-plugin-pwa` plugin and the integrations.

From `v0.19.0`, `vite-plugin-pwa` includes a new experimental feature, check [Integrations](/assets-generator/integrations) section.
:::

### v0.1.0 <Badge text="deprecated" type="warning" />

As mentioned previously, the API is low-level, it means that you have to handle the default values yourself: you can check the default values in the [defaults.ts](https://github.com/vite-pwa/assets-generator/tree/main/src/api/defaults.ts) module.

The CLI has been rebuilt on top of the API, you can check the [CLI documentation](/assets-generator/cli) for more details about the default values.


