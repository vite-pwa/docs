---
title: Migrations | PWA Assets 生成器
next: 开始 | Frameworks
outline: deep
---

# Migrations

When migrating from one version to a new one, you should remove all the PWA assets generated previously and generate them again after upgrading `@vite-pwa/assets-generator` package.

:::warning
If you're using some of the old PWA assets in your application, **don't remove them**.
:::

Remember to check the changes before upgrading to a new version in your local environment:
- start the current version in your local server, opening your application to check the old PWA assets
- upgrade the package to the new version and regenerate the PWA assets
- start the new version in your local server, refresh your application to check the new PWA assets

## From `v0.1.0` to `v0.2.0`

The `api` and the core has been built from scratch, the CLI has been rebuilt on top of the API.

The main changes included in version `v0.2.0` are:
- `generatePWAImageAssets` and  `generatePWAAssets` functions have been removed from `@vite-pwa/assets-generator` package export: now the package only export types and some utilities.
- new `@vite-pwa/assets-generator/api/instructions` package export: new `instructions` function to collect the icon assets instructions.
- new `@vite-pwa/assets-generator/api/generate-assets` package export: new `generateAssets` function to generate icon assets from an instruction.
- new `@vite-pwa/assets-generator/api/generate-html-markup` package export: new `generateHtmlMarkup` function to generate all html head links from an instruction.
- new `@vite-pwa/assets-generator/api/generate-manifest-icons-entry` package export: new `generateManifestIconsEntry` function to generate the PWA web manifest icons' entry.
- new CLI options for html head links generation: `xhtml` and `includeId`.

If you are using `generatePWAImageAssets` and/or `generatePWAAssets` functions, you need to update your code to use the new `instructions` and `generateAssets` functions.

If you're only using the CLI, you don't need to change anything.

For more details about the new version `v0.2.0`, check [this comment](https://github.com/vite-pwa/assets-generator/issues/20#issuecomment-1848382903) in the repository.

## From `minimal` to `minimal-2023` Preset

If you are using `pwa-assets-generator` in your `package.json` scripts, update the script from:
```json
"generate-assets": "pwa-assets-generator --preset minimal <your-logo-path>"
```
to:
```json
"generate-assets": "pwa-assets-generator --preset minimal-2023 <your-logo-path>"
```

If you are using a configuration file:
- update the built-in preset name or update the import to use `minimal2023Preset`: check the code snippets in the [built-in features section](/assets-generator/cli#built-in-features).
- include `headLinkOptions.preset = '2023'` in you configuration file


The new `minimal-2023` preset changes only the `favicon.ico` size, the `apple-touch-icon` and PWA manifest icons are the same, you need to update your html head favicon entries, from:
```html
<head>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
</head>
```

to:
```html
<head>
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">
</head>
```

