import type { VitePWAOptions, VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'

export interface VitePressExperimentalOptions {
  /**
   * When using `generateSW` strategy, include the logic to handle the `workbox.navigateFallbackAllowlist` option.
   *
   * @see https://github.com/vite-pwa/vitepress/issues/22
   *
   * @default false
   */
  includeAllowlist?: boolean
}

export type PwaOptions<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
> = VitePWAOptions<UserStrategy, T> & {
  experimental?: VitePressExperimentalOptions
}
