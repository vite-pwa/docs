---
title: CLI | PWA Assets 生成器
outline: deep
---

# CLI

The command line interface: `@vite-pwa/assets-generator`.
- 💥 build your PWA assets from a single command, using only 2 options: preset and source
- 🔌 supports custom configurations via `pwa-assets.config.js` or `pwa-assets.config.ts`

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

## 使用

```bash
$ pwa-assets-generator [options] [sources]
```

:::info
The source files should be relative to `root`.
:::

Example using command line:
```bash
$ pwa-assets-generator --preset minimal-2023 public/logo.svg
```

or using package configuration:
```json
{
  "scripts": {
    "generate-pwa-assets": "pwa-assets-generator --preset minimal-2023 public/logo.svg"
  }
}
```

:::info
All PWA assets will be generated in the same source folder.
:::

## Options

| Options                      |                                                                                                                                                         |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-v, --version`              | Display version number                                                                                                                                  |
| `-r, --root <path>`          | Define the project root, defaults to `process.cwd()`                                                                                                    |
| `-c, --config <path>`        | Path to config file                                                                                                                                     |
| `-p, --preset <preset-name>` | Built-in preset name: `minimal` (default), `minimal-2023`, `android`, `windows`, `ios` or `all`                                                         |
| `-o, --override`             | Override assets. Defaults to true (`--override=false` or `-o=false` to disable it)                                                                      |
| `-m, --manifest`             | Generate PWA web manifest icons entry. Defaults to true  (`--manifest=false` or `-m=false` to disable it)                                               |
| `--html [options]`           | Available options: `--html.basePath <path>`, `--html.preset <default\|2023>`, `--html.xhtml <false\|true>` and `--html.includeId <false\|true>` |
| `-h, --help`                 | Display available CLI options                                                                                                                           |

## Presets

PWA Assets 生成器 has 5 built-in presets, check out the [preset definition](https://github.com/vite-pwa/assets-generator/tree/main/src/preset.ts) and [types definition](https://github.com/vite-pwa/assets-generator/tree/main/src/types.ts):
- Minimal Preset 2023 (`minimal-2023`) <Badge type="tip" text="New from v0.1.0" />
- Minimal Preset (`minimal`) <Badge type="danger" text="Deprecated from v0.1.0" />
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
  minimal2023Preset as preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset,
  images: ['public/logo.svg']
})
```

:::info
CLI options will override the configuration file options.
:::

You can use one of the built-in presets or just define your own, this is the [minimal-2023 preset](https://github.com/vite-pwa/assets-generator/tree/main/src/presets/minimal-2023.ts) definition:
```ts
import type { Preset } from '@vite-pwa/assets-generator/config';

export const minimal2023Preset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[48, 'favicon.ico']]
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
$ pwa-assets-generator
```

or configure it in your `package.json` and run it via your package manager from the command line:
```json
{
  "scripts": {
    "generate-pwa-assets": "pwa-assets-generator"
  }
}
```

### Favicon and Apple Touch Icon Links <Badge type="tip" text="New from v0.1.0" />

From version `v0.1.0`, the `@vite-pwa/assets-generator` CLI will generate the favicon and apple touch icon links.

If you're using any of the built-in presets from the CLI, the preset will be auto-detected.

If you're using the configuration file, you will need to include the new `headLinkOptions` option in your configuration file to configure the new preset `2023` layout for your favicons and apple touch icon links:
```ts
export interface HeadLinkOptions {
  /**
   * Base path to generate the html head links.
   *
   * @default '/'
   */
  basePath?: string
  /**
   * The preset to use.
   *
   * If using the built-in presets from CLI (`minimal` or `minimal-2023`), this option will be ignored (will be set to `default` or `2023` for `minimal` and `minimal-2023` respectively).
   *
   * @default 'default'
   */
  preset?: HtmlLinkPreset
  /**
   * By default, the SVG favicon will use the SVG file name as the name.
   *
   * For example, if you provide `public/logo.svg` as the image source, the name will be `<basePath>logo.svg`.
   *
   * @param name The name of the SVG icons.
   */
  resolveSvgName?: (name: string) => string
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
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    ...minimal2023Preset,
    assetName: (type: AssetType, size: ResolvedAssetSize) => {
      /* your logic here */
    }
  },
  images: ['public/logo.svg']
})
```

### PNG Padding

When generating PNG files, PWA Assets 生成器 will apply the following padding:
- for `transparent` PNG files: `0.05`
- for `maskable` and `apple` PNG files: `0.3`

`0` is no padding, `0.3` is a typical value for most icons.

These values can be customized inside a custom preset:
```ts
import type { Preset } from '@vite-pwa/assets-generator/config';

export const minimalPresetNoPadding: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[48, 'favicon.ico']],
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
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    ...minimal2023Preset,
    png: {
      compressionLevel: 9,
      quality: 85
    }
  },
  images: ['public/logo.svg']
})
```

### Favicons

PWA Assets 生成器 will generate favicons when explicitly defined in the preset. If you want to generate favicons, but not the corresponding PWA icons, add the favicons sizes you want to generate, PWA Assets 生成器 will generate the PWA icon to generate the corresponding favicon and once generated, the PWA icon will be removed.

For example, if you want to generate a `48x48` favicon using the default preset, you can use the following configuration:
```ts
import { defineConfig } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  /* remember to include the preset for favicons and apple touch icon */
  headLinkOptions: {
    preset: '2023'
  },
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

PWA Assets 生成器 will generate the `public/pwa-48x48.png` PWA icon, then generate the corresponding favicon (`public/favicon-48x48.ico`) and finally remove the PWA icon (`public/pwa-48x48.png`).

### PWA Manifest Icons Entry <Badge type="tip" text="New from v0.2.0" />

By default, the CLI will show the PWA manifest icons' entry in the terminal. You can disable it using `-m=false` or `--manifest=false` option from CLI or using `manifestIconsEntry: false` in the file configuration.

If you have configured `logLevel: 'silent'` in your configuration file, the CLI will not log the PWA manifest icons' entry. 

### iOS/iPad Splash Screens

PWA Assets 生成器 will generate iOS/iPad splash screens when explicitly defined in the preset: [iOS and iPadOS in web.dev](https://web.dev/learn/pwa/enhancements/#splash-screens).

You can use `createAppleSplashScreens` function to create the splash screens configuration using global configuration and the device names you want to generate the splash screens for.

If the device names are not provided in the `createAppleSplashScreens` function, PWA Assets 生成器 will generate splash screens for all devices (defined in the [splash](https://github.com/vite-pwa/assets-generator/blob/main/src/splash.ts) module).

PWA Assets 生成器 will generate the landscape and portrait PNG files per device. If you also want to generate the dark splash screens, you will end up with four PNG files per device.

For example, if you want to generate splash screens for `iPad Air 9.7"` device, you can use the following configuration (the values in the example are the default ones if you don't provide any configuration):
```ts
import {
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    ...minimal2023Preset,
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
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: combinePresetAndAppleSplashScreens(
    minimal2023Preset, {
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
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: combinePresetAndAppleSplashScreens(minimal2023Preset, {
    // dark splash screens using black background (the default)
    darkResizeOptions: { background: 'black', fit: 'contain' },
    // or using a custom background color
    // darkResizeOptions: { background: '#1f1f1f' },
  }, ['iPad Air 9.7"']),
  images: ['public/logo.svg']
})
```

#### Advanced Configuration

We strongly suggest using the global configuration, providing `padding`, `resizeOptions`, `darkResizeOptions` and `png` options globally, PWA Assets 生成器 will configure any splash screen device options properly.

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
  minimal2023Preset
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
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    ...minimal2023Preset,
    appleSplashScreens: createCustomAppleSplashScreens({
      padding: 0.5,
      darkResizeOptions: { background: '#1f1f1f' },
    })
  },
  images: ['public/logo.svg']
})
```

#### Custom Dark Splash Screens Image Source <Badge type="tip" text="New from v0.2.2" />

From version `v0.2.2`, you can provide a custom dark splash screens image source using `darkImageResolver` option in the `createAppleSplashScreens` and `combinePresetAndAppleSplashScreens` functions options:
- if you're using multiple images, you will need to return the proper dark image using the `imageName` parameter in the `darkImageResolver` function: check the [playground](https://github.com/vite-pwa/assets-generator/blob/main/playground/pwa-assets.config.mts) for an example.
- if you're using a single image, you can ignore the `imageName` parameter.
