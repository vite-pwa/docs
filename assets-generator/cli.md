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
  minimalPreset
} from '@vite-pwa/assets-generator/config'
import { minor } from "semver";

export default defineConfig({
  preset: {
    ...minimalPreset,
    assetName: (type: AssetType, size: ResolvedAssetSize) => {
      /* your logic here */
    }
  },
  images: ['public/logo.svg']
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
```txt
{
  compressionLevel: 9,
  quality: 60
}
```

You can provide your optimization options using `png` option, check the options in [sharp png output options](https://sharp.pixelplumbing.com/api-output#png):
```ts
import {
  defineConfig,
  minimalPreset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimalPreset,
    png: {
      compressionLevel: 9,
      quality: 85
    }
  },
  images: ['public/logo.svg']
})
```

### Favicons

PWA Assets Generator will generate favicons when explicitly defined in the preset. If you want to generate favicons, but not the corresponding PWA icons, add the favicons sizes you want to generate, PWA Assets Generator will generate the PWA icon to generate the corresponding favicon and once generated, the PWA icon will be removed.

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

### iOS/iPad Splash Screens

PWA Assets Generator will generate iOS/iPad splash screens when explicitly defined in the preset: [iOS and iPadOS in web.dev](https://web.dev/learn/pwa/enhancements/#splash-screens).

You can use `createAppleSplashScreens` function to create the splash screens configuration using global configuration and the device names you want to generate the splash screens for.

If the device names are not provided in the `createAppleSplashScreens` function, PWA Assets Generator will generate splash screens for all devices (defined in the [splash](https://github.com/vite-pwa/assets-generator/blob/main/src/splash.ts) module).

PWA Assets Generator will generate the landscape and portrait PNG files per device. If you also want to generate the dark splash screens, you will end up with four PNG files per device.

For example, if you want to generate splash screens for `iPad Air 9.7"` device, you can use the following configuration (the values in the example are the default ones if you don't provide any configuration):
```ts
import {
  createAppleSplashScreens,
  defineConfig,
  minimalPreset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: {
    ...minimalPreset,
    appleSplashScreens: createAppleSplashScreens({
      padding: 0.3,
      resizeOptions: { background: 'white', fit: 'contain' },
      // by default, dark splash screens are exluded
      // darkResizeOptions: { background: 'black' },
      linkMediaOptions: {
        // will log the links you need to add to your html pages
        log: true,
        // add screen to media attribute link?
        // by default:
        // <link rel="apple-touch-startup-image" href="..." media="screen and ...">
        addMediaScreen: true,
        basePath: '/',
        // add closing link tag?
        // by default:
        // <link rel="apple-touch-startup-image" href="..." media="...">
        // with xhtml enabled:
        // <link rel="apple-touch-startup-image" href="..." media="..." />
        xhtml: false
      },
      png: {
        compressionLevel: 9,
        quality: 60
      },
      name: (landscape, size, dark) => {
        return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${typeof dark === 'boolean' ? (dark ? 'dark-' : 'light-') : ''}${size.width}x${size.height}.png`
      }
    }, ['iPad Air 9.7"'])
  },
  images: ['public/logo.svg']
})
```

You can also use `combinePresetAndAppleSplashScreens` to combine the preset and the splash screens configuration:
```ts
import {
  combinePresetAndAppleSplashScreens,
  defineConfig,
  minimalPreset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: combinePresetAndAppleSplashScreens(
    minimalPreset, {
      padding: 0.3,
      resizeOptions: { background: 'white', fit: 'contain' },
      // by default, dark splash screens are exluded
      // darkResizeOptions: { background: 'black' },
      linkMediaOptions: {
        // will log the links you need to add to your html pages
        log: true,
        // add screen to media attribute link?
        // by default:
        // <link rel="apple-touch-startup-image" href="..." media="screen and ...">
        addMediaScreen: true,
        basePath: '/',
        // add closing link tag?
        // by default:
        // <link rel="apple-touch-startup-image" href="..." media="...">
        // with xhtml enabled:
        // <link rel="apple-touch-startup-image" href="..." media="..." />
        xhtml: false
      },
      png: {
        compressionLevel: 9,
        quality: 60
      },
      name: (landscape, size, dark) => {
        return `apple-splash-${landscape ? 'landscape' : 'portrait'}-${typeof dark === 'boolean' ? (dark ? 'dark-' : 'light-') : ''}${size.width}x${size.height}.png`
      }
    },
    ['iPad Air 9.7"']
  ),
  images: ['public/logo.svg']
})
```

#### Dark Splash Screens

If you also want to generate `dark` splash screens, you can provide an empty `darkResizeOptions` option (the generator will set `background: 'black'` and `'fit: 'contain'` if missing) or providing any other options. Following with the previous example:
```ts
import {
  combinePresetAndAppleSplashScreens,
  defineConfig,
  minimalPreset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset: combinePresetAndAppleSplashScreens(minimalPreset, {
    // dark splash screens using black background (the default)
    darkResizeOptions: { background: 'black', fit: 'contain' },
    // or using a custom background color
    // darkResizeOptions: { background: '#1f1f1f' },
  }, ['iPad Air 9.7"']),
  images: ['public/logo.svg']
})
```

#### Advanced Configuration

We strongly suggest using the global configuration, providing `padding`, `resizeOptions`, `darkResizeOptions` and `png` options globally, PWA Assets Generator will configure any splash screen device options properly.

If you still want to use a custom configuration per device, you can provide `padding`, `resizeOptions`, `darkResizeOptions` and `png` options per device, but you will need to configure them via some custom logic. You can use the following exports from the `config` module (check the [splash](https://github.com/vite-pwa/assets-generator/blob/main/src/splash.ts) module, all splash exports being exported also in the `@vite-pwa/assets-generator/config` module):
- `AppleDeviceName`: all Apple device names
- `appleSplashScreenSizes`: all Apple splash screen sizes including the scale factor
- `AllAppleDeviceNames`: all Apple device names as an array
- `createAppleSplashScreens`: the logic inside that function is quite simple, you can use it as a starting point to create your own splash screens configuration

`resizeOptions` and `darkResizeOptions` are [ResizeOptions from Sharp](https://github.com/search?q=repo%3Alovell%2Fsharp%20ResizeOptions&type=code)

For example, to create this custom configuration:
- generate dark splash screens
- global configuration with `0.5` padding, default splash screen names and `#1f1f1f` background color for dark splash screens
- create splash screens for `iPad Air 9.7"` device using global configuration
- create splash screens for `iPhone 6` device using a custom configuration:
  - padding: `0.4`
  - custom splash screen name
  - `#2f2f2f` background color for dark splash screens 

you can use the following configuration:
```ts
import {
  type AppleDeviceName,
  type AppleDeviceSize,
  appleSplashScreenSizes,
  defineConfig,
  minimalPreset
} from '@vite-pwa/assets-generator/config'

const devices: AppleDeviceName[] = ['iPad Air 9.7"', 'iPhone 6']

function createCustomAppleSplashScreens(
  options: {
    padding?: number
    resizeOptions?: ResizeOptions
    darkResizeOptions?: ResizeOptions
    linkMediaOptions?: AppleTouchStartupImageOptions
    name?: AppleSplashScreenName
  } = {}
) {
  const {
    padding,
    resizeOptions,
    darkResizeOptions,
    linkMediaOptions,
    name,
  } = options

  return <AppleSplashScreens>{
    sizes: devices.map((deviceName) => {
      const size = appleSplashScreenSizes[deviceName]
      if (deviceName === 'iPhone 6') {
        return <AppleDeviceSize>{
          size: { ...size, padding: 0.4 },
          darkResizeOptions: { background: '#2f2f2f' },
          name: (landscape, size, dark) => `iphone6-${landscape ? 'landscape' : 'portrait'}${dark ? '-dark' : ''}.png`
        }
      }

      return size
    }),
    padding,
    resizeOptions,
    darkResizeOptions,
    linkMediaOptions,
    name,
  }
}

export default defineConfig({
  preset: {
    ...minimalPreset,
    appleSplashScreens: createCustomAppleSplashScreens({
      padding: 0.5,
      darkResizeOptions: { background: '#1f1f1f' },
    })
  },
  images: ['public/logo.svg']
})
```
