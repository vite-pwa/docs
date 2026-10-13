import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { DefaultTheme, UserConfig } from 'vitepress'
import { BuildPwaAssetsPlugin } from '@unplugin-pwa/vite/plugins/build-pwa-assets'
import { BuildRegisterSWPlugin } from '@unplugin-pwa/vite/plugins/build-register-sw'
import { DevPlugin } from '@unplugin-pwa/vite/plugins/dev'
import { DevMiddlewarePlugin } from '@unplugin-pwa/vite/plugins/dev-middleware'
import { DevAssetsMiddlewarePlugin } from '@unplugin-pwa/vite/plugins/dev-pwa-assets-middleware'
import { DevtoolsPlugin } from '@unplugin-pwa/vite/plugins/devtools'
import { InfoPlugin } from '@unplugin-pwa/vite/plugins/info'
import { InspectorPlugin } from '@unplugin-pwa/vite/plugins/inspector'
import { MainPlugin } from '@unplugin-pwa/vite/plugins/main'
import { AssetsPlugin } from '@unplugin-pwa/vite/plugins/pwa-assets'
import { VirtualModulesPlugin } from '@unplugin-pwa/vite/plugins/virtual-modules'
import { createVitePressPWAContext } from './create-context.ts'

export function withUserConfig<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
  VPTheme = DefaultTheme.Config,
>(
  config: UserConfig<VPTheme>,
): UserConfig<VPTheme> {
  const ctx = createVitePressPWAContext<UserStrategy, T, VPTheme>(config)
  const viteConf = config.vite ??= {}
  const vitePlugins = viteConf.plugins ??= []

  vitePlugins.push([
    MainPlugin(ctx),
    VirtualModulesPlugin(ctx),
    InfoPlugin(ctx),
    DevPlugin(ctx),
    DevMiddlewarePlugin(ctx),
    DevAssetsMiddlewarePlugin(ctx),
    AssetsPlugin(ctx),
    BuildRegisterSWPlugin(ctx),
    BuildPwaAssetsPlugin(ctx),
    DevtoolsPlugin(ctx),
    InspectorPlugin(ctx),
  ])

  return config
}
