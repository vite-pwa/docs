---
title: Getting Started | PWA Assets Generator
prev: FAQ | Guide
outline: deep
---

# Getting Started

[@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) will generate all the icons required for your PWA application using [sharp](https://github.com/lovell/sharp/) and [sharp-ico](https://github.com/ssnangua/sharp-ico) packages.

This package has been developed based on the work done in [Elk PWA Icon Generator Script](https://github.com/elk-zone/elk/blob/main/scripts/generate-pwa-icons.ts).

With a single image source you can generate all the required icons for your PWA application, via `@vite-pwa/assets-generator` [CLI](/assets-generator/cli) or [API](/assets-generator/api).

## Source images

We strongly recommend using SVG images as source images, as they will be resized to the required sizes without losing quality, but should also work with any image type.

The svg sources can also be used in for the favicon html head link.

## PWA Minimal Icons Requirements

As pointed out in [PWA Minimal Requirements](/guide/pwa-minimal-requirements), you will need:
- a 192x192 icon (PWA Manifest icon)
- a 512x512 icon (PWA Manifest icon)
- a 180x180 icon for iOS/MacOS (html head link: `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`)

We also suggest you to include:
- A 64x64 icon for Windows (Edge) (PWA Manifest icon)
- A 512x512 icon for Android with `purpose: 'any'` (PWA Manifest icon)
- Avoid using `purpose: 'any maskable'` icon, as it is not supported by all browsers
- An `favicon.ico` and `favicon.svg`, check [Preset Minimal 2023](#preset-minimal-2023) for more details

### Preset Minimal 2023 <Badge type="tip" text="New from v0.1.0" />

Refer to [Definitive edition of "How to Favicon" in 2023](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7) for more details.

Our minimal recommendation is:
- transparent 48x48 ico: register it in the html head: `<link rel="icon" href="/favicon.ico" sizes="48x48">`
- Use SVG image as source image: register it in the html head: `<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">`
- transparent 64x64 icon (PWA Manifest icon)
- transparent 192x192 icon (PWA Manifest icon)
- transparent 512x512 icon with `purpose: 'any'` (PWA Manifest icon)
- white 512x512 icon with `purpose: 'maskable'` (PWA Manifest icon): background color can be customized to your needs
- white 180x180 icon for iOS/MacOS (html head link: `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`): background color can be customized to your needs

### Preset Minimal <Badge type="danger" text="Deprecated from v0.1.0" />

Our minimal recommendation is:
- transparent 64x64 ico: register it in the html head: `<link rel="icon" href="/favicon.ico" sizes="any">`
- Use SVG image as source image: register it in the html head: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`
- transparent 64x64 icon (PWA Manifest icon)
- transparent 192x192 icon (PWA Manifest icon)
- transparent 512x512 icon with `purpose: 'any'` (PWA Manifest icon)
- white 512x512 icon with `purpose: 'maskable'` (PWA Manifest icon): background color can be customized to your needs
- white 180x180 icon for iOS/MacOS (html head link: `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`): background color can be customized to your needs

## Example using minimal preset

You can generate icons using the `minimal-2023` preset included in [@vite-pwa/assets-generator](https://github.com/vite-pwa/assets-generator) package via a source image, check out the [CLI](/assets-generator/cli) and [API](/assets-generator/api) documentation for more details.

Update your PWA manifest icons entry with:
```ts
icons: [
  {
    src: 'pwa-64x64.png',
    sizes: '64x64',
    type: 'image/png'
  },
  {
    src: 'pwa-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: 'pwa-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'  
  },
  {
    src: 'maskable-icon-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
]
```

and use the following HTML head entries in your entry point:

### Using Preset Minimal 2023 <Badge type="tip" text="New from v0.1.0" />

```html
<head>
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png">
</head>
```

### Using Preset Minimal <Badge type="danger" text="Deprecated from v0.1.0" />

```html
<head>
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png">
</head>
```
