---
title: Migrations | PWA Assets Generator
next: Getting Started | Frameworks
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

## From `minimal` to `minimal-2023` Preset

If you are using `pwa-assets-generator` in your `package.json` scripts, update the script from:
```json
"generate-assets": "pwa-assets-generator --preset minimal <your-logo-path>"
```
to:
```json
"generate-assets": "pwa-assets-generator --preset minimal-2023 <your-logo-path>"
```

If you are using a configuration file, update the built-in preset name or update the import to use `minimal2023Preset`: check the code snippets in the [built-in features section](/assets-generator/cli#built-in-features).

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

