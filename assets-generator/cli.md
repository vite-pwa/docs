---
title: CLI | PWA Assets Generator
outline: deep
---

# CLI

The command line interface: `@vite-pwa/assets-generator`.
- 💥 build your PWA assets from a single command, using only 2 options: preset and source
- 🔌 supports custom configurations via `pwa-assets.config.js` or `pwa-assets.config.ts`

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

## Usage

```bash
$ pwa-asset-generator [options] [sources]
```

:::info
The source files should be relative to `root`.
:::

Example using command line:
```bash
$ pwa-assets-generator --preset minimal public/logo.svg
```

or using package configuration:
```json
{
  "scripts": {
    "generate-pwa-assets": "pwa-assets-generator --preset minimal public/logo.svg"
  }
}
```

:::info
All PWA assets will be generated in the same source folder.
:::

## Options

| Options                      |                                                                       |
|------------------------------|-----------------------------------------------------------------------|
| `-v, --version`              | Display version number                                                |
| `-r, --root <path>`          | Define the project root, defaults to `process.cwd()`                  |
| `-c, --config <path>`        | Path to config file                                                   |
| `-p, --preset <preset-name>` | Built-in preset name: `minimal`, `android`, `windows`, `ios` or `all` |
| `-o, --override`             | Override assets? Defaults to true                                     |
| `-h, --help`                 | Display available CLI options                                         |

## Presets

PWA Assets Generator has 5 built-in presets, check out the [preset definition](https://github.com/vite-pwa/assets-generator/tree/main/src/preset.ts) and [types definition](https://github.com/vite-pwa/assets-generator/tree/main/src/types.ts):
- Minimal Preset (`minimal`)
- iOS Preset (`ios`): (WIP)
- Windows Preset (`windows`): (WIP)
- Android Preset (`android`): (WIP)
- Full Preset (`all`: `android`, `windows` and `ios` presets combined): (WIP)

You can also define your own preset, to use it you will need to add [pwa-assets config file](#configurations) to the root of your project.

## Built-in features

### Configurations

Create a `pwa-assets.config.js` or `pwa-assets.config.ts` configuration file in the root-level of your project to customize PWA assets generator CLI:
```ts
import {
  defineConfig,
  minimalPreset as preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: ['public/logo.svg']
})
```

:::info
CLI options will override the configuration file options.
:::

You can use one of the built-in presets or just define your own, this is the [minimal preset](https://github.com/vite-pwa/assets-generator/tree/main/src/presets/minimal.ts) definition:
```ts
import type { Preset } from '@vite-pwa/assets-generator/config';

export const minimalPreset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, 'favicon.ico']]
  },
  maskable: {
    sizes: [512]
  },
  apple: {
    sizes: [180]
  }
}
```

Then run the CLI from the command line:
```bash
$ pwa-asset-generator
```

or configure it in your `package.json` and run it via your package manager from the command line:
```json
{
  "scripts": {
    "generate-pwa-assets": "pwa-assets-generator"
  }
}
```

### PNG output names

The PNG files names will be generated using the following function (can be found in [utils module](https://github.com/vite-pwa/assets-generator/tree/main/src/utils.ts)):
```ts
export function defaultAssetName(type: AssetType, size: ResolvedAssetSize) {
  switch (type) {
    case 'transparent':
      return `pwa-${size.width}x${size.height}.png`
    case 'maskable':
      return `maskable-icon-${size.width}x${size.height}.png`
    case 'apple':
      return `apple-touch-icon-${size.width}x${size.height}.png`
  }
}
```

You can override the PNG output names providing custom `assetName` option:
```ts
import {
  defineConfig,
  minimalPreset as preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: ['public/logo.svg'],
  assetName: (type: AssetType, size: ResolvedAssetSize) => {
    /* your logic here */  
  }
})
```

### PNG Padding

When generating PNG files, PWA Assets Generator will apply the following padding:
- for `transparent` PNG files: `0.05`
- for `maskable` and `apple` PNG files: `0.3`

`0` is no padding, `0.3` is a typical value for most icons.

These values can be customized inside a custom preset:
```ts
import type { Preset } from '@vite-pwa/assets-generator/config';

export const minimalPresetNoPadding: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[64, 'favicon.ico']],
    padding: 0
  },
  maskable: {
    sizes: [512],
    padding: 0
  },
  apple: {
    sizes: [180],
    padding: 0
  }
}
```

### PNG optimization/compression

By default, all generated PNG files are optimized using:
```ts
{
  compressionLevel: 9,
  quality: 60
}
```

You can provide your optimization options using `png` option, check the options in [sharp png output options](https://sharp.pixelplumbing.com/api-output#png):
```ts
import {
  defineConfig,
  minimalPreset as preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: ['public/logo.svg'],
  png: {
    compressionLevel: 9,
    quality: 85
  }
})
```

### Favicons

PWA Assets Generator will generate favicons when explicitly defined in the preset. If you want to generate favicons, but not the corresponding PWA icons, add the favicons sizes you want to generate, PWA Assets Generator will generate the corresponding PWA icon to generate the favicon and once generated the PWA icon will be removed.

For example, if you want to generate a `48x48` favicon using the default preset, you can use the following configuration:
```ts
import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, "favicon-48x48.ico"], [64, "favicon.ico"]]
    },
    maskable: {
      sizes: [512]
    },
    apple: {
      sizes: [180]
    }
  },
  images: ['public/logo.svg'],
})
```

PWA Assets Generator will generate the `public/pwa-48x48.png` PWA icon, then generate the corresponding favicon (`public/favicon-48x48.ico`) and finally remove the PWA icon (`public/pwa-48x48.png`).
