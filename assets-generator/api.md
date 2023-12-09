---
title: API | PWA Assets Generator
outline: deep
---

# PWA Assets Generator API

From `v0.1.0`, `@vite-pwa/assets-generator` is shipped with a CLI and an API (low-level api).

`@vite-pwa/assets-generator` is bundler/framework agnostic, you can use it in any project: right now, there is no integration available, we're working on this (stay tuned).

The API can be found in the [api folder](https://github.com/vite-pwa/assets-generator/tree/main/src/api).

## Installation

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

As mentioned previously, the API is low-level, it means that you have to handle the default values yourself: you can check the default values in the [defauls.ts](https://github.com/vite-pwa/assets-generator/tree/main/src/api/default.ts) module.

The CLI has been rebuilt on top of the API, you can check the [CLI documentation](/assets-generator/cli) for more details about the default values.

### generateFavicon

### createAppleSplashScreenHtmlLink

### generateMaskableAsset

### generateTransparentAsset

### extractAssetSize <Badge type="info" text="helper" />

### createSharp <Badge type="info" text="helper" />
