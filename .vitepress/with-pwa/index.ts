import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { DefaultTheme, UserConfigExport } from 'vitepress'
import type { PwaOptions } from './types.ts'
import { withUserConfig } from './integration.ts'

export type * from './types.ts'

export async function withPwa<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
  VPTheme = DefaultTheme.Config,
>(
  config: UserConfigExport<VPTheme>,
): Promise<UserConfigExport<VPTheme>> {
  if (typeof config === 'function') {
    return async (ctx) => {
      const userConfig = await config(ctx)
      return withUserConfig<UserStrategy, T, VPTheme>(userConfig)
    }
  }

  return withUserConfig<UserStrategy, T, VPTheme>(await config)
}

declare module 'vitepress' {
  interface UserConfig {
    pwa?: Partial<PwaOptions<VitePWAStrategy, SWType>>
  }
}
