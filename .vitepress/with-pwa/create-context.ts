import type { ResolvedGenerateSW, VitePWAStrategy } from '@unplugin-pwa/core'
import type { VitePWAPluginContext } from '@unplugin-pwa/vite/vite-context'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { UserConfig } from 'vitepress'
import type { PwaOptions, VitePressExperimentalOptions } from './types.ts'
import path from 'node:path'
import { createVitePWAContext } from '@unplugin-pwa/vite/vite-context'
import { escapeStringRegexp } from './utils.ts'

export interface VitePressPWAContext<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
> extends VitePWAPluginContext<'vite', UserStrategy, T> {
  vitepress: {
    runtimeCachingAdded: boolean
    experimental: Required<VitePressExperimentalOptions>
  }
}

export function createVitePressPWAContext<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
  VPTheme,
>(
  config: UserConfig<VPTheme>,
): VitePressPWAContext<UserStrategy, T> {
  const pwa = (config.pwa ?? {}) as Partial<PwaOptions<UserStrategy, T>>

  const ctx = Object.assign(
    createVitePWAContext(true, pwa),
    {
      vitepress: {
        runtimeCachingAdded: false,
        experimental: undefined!,
      },
    },
  ) as VitePressPWAContext<UserStrategy, T>

  ctx.configurePWAOptions = (_, viteResolvedConfig) => {
    const vp = ctx.consumerOptions as PwaOptions<UserStrategy, T>
    if (vp.experimental?.includeAllowlist) {
      // const vp = ctx.consumerOptions as PwaOptions<UserStrategy, T>
      ctx.vitepress.experimental = {
        includeAllowlist: vp.experimental?.includeAllowlist,
      }
    }
    else {
      ctx.vitepress.experimental = {
        includeAllowlist: false,
      }
    }
    ctx.base = config.base || '/'
    const buildCommand = viteResolvedConfig.command === 'build'
    if (!buildCommand) {
      return undefined
    }

    if (ctx.strategy === 'generate-sw' && ctx.vitepress.experimental.includeAllowlist && !ctx.vitepress.runtimeCachingAdded) {
      // prevent adding runtime caching twice: configurePWAOptions called on SSR and client builds
      ctx.vitepress.runtimeCachingAdded = true
      ctx.resolvedOptions.generateSW ??= {}
      const generateSW = ctx.resolvedOptions.generateSW as ResolvedGenerateSW<'generate-sw', T>
      generateSW.runtimeCaching ??= []
      // add offline support: without this, missing page will not work offline
      generateSW.runtimeCaching.push({
        urlPattern: ({ request, sameOrigin }) => {
          return sameOrigin && request.mode === 'navigate'
        },
        handler: 'NetworkOnly',
        options: {
          plugins: [{
            /* this callback will be called when the fetch call fails */
            handlerDidError: async () => Response.redirect('404', 302),
            /* this callback will prevent caching the response */
            cacheWillUpdate: async () => null,
          }],
        },
      })
    }

    const outDir = config.outDir ?? '.vitepress/dist'
    const immutableAssets = config.assetsDir
      ? config.assetsDir
          .replace(/\\/g, '/')
          .replace(/^\.?\/|\/$/g, '')
      : 'assets'
    const base = config.base ?? config.vite?.base ?? '/'
    ctx.resolvedOptions.base = base
    ctx.resolvedOptions.scope = base

    if (ctx.resolvedOptions.pwaAssets) {
      const publicDir = typeof config.vite?.publicDir === 'string'
        ? path.resolve(config.vite.publicDir)
        : path.resolve('public')
      ctx.resolvedOptions.pwaAssets.integration = {
        baseUrl: base,
        publicDir,
        outDir: path.resolve(outDir),
      }
    }

    return {
      outDir,
      immutableAssets,
      cwd: viteResolvedConfig.root,
    }
  }

  const consumerTransformHead = config.transformHead

  config.transformHead = async (vpCtx) => {
    const head = (await consumerTransformHead?.(vpCtx)) ?? []

    const assetsGenerator = await ctx.pwaAssetsGenerator
    if (assetsGenerator) {
      const htmlAssets = assetsGenerator.resolveHtmlAssets()
      if (htmlAssets.themeColor)
        head.push(['meta', { name: 'theme-color', content: htmlAssets.themeColor.content }])
      for (const link of htmlAssets.links)
        head.push(['link', { ...link }])
    }

    const webManifestData = ctx.webManifestData()
    if (webManifestData) {
      const href = webManifestData.href
      if (webManifestData.useCredentials)
        head.push(['link', { rel: 'manifest', href, crossorigin: 'use-credentials' }])
      else
        head.push(['link', { rel: 'manifest', href }])
    }

    const registerSWData = await ctx.registerSWData()
    if (registerSWData && registerSWData.shouldRegisterSW) {
      if (registerSWData.mode === 'inline') {
        head.push([
          'script',
          { id: 'vite-pwa:vitepress:inline-sw' },
          `if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('${registerSWData.inlinePath}', { scope: '${registerSWData.scope}' })})}`,
        ])
      }
      else {
        if (registerSWData.mode === 'script-defer') {
          head.push([
            'script',
            {
              id: 'vite-pwa:vitepress:register-sw',
              defer: 'defer',
              src: registerSWData.registerPath,
            },
          ])
        }
        else {
          head.push([
            'script',
            {
              id: 'vite-pwa:vitepress:register-sw',
              src: registerSWData.registerPath,
            },
          ])
        }
      }
    }

    return head
  }

  const consumerBuildEnd = config.buildEnd

  config.buildEnd = async (siteConfig) => {
    await consumerBuildEnd?.(siteConfig)
    if (!ctx.resolvedOptions.disable) {
      // add pages to allowlist: any page that is not in the allowlist will not work offline
      if (ctx.strategy === 'generate-sw' && ctx.vitepress.experimental.includeAllowlist) {
        const generateSW = ctx.resolvedOptions.generateSW ?? {} as ResolvedGenerateSW<'generate-sw', T>
        const allowlist = generateSW.navigateFallbackAllowlist ??= []
        const base = siteConfig.site.base ?? '/'
        for (const page of siteConfig.pages) {
          const regex = page === 'index.md'
            ? escapeStringRegexp(base)
            : escapeStringRegexp(`${base}${page.replace(/\.md$/, '')}`)
          allowlist.push(new RegExp(`^${regex}(\\.html)?$`))
        }
      }

      // build the sw
      await ctx.runBuild()
    }
  }

  return ctx
}
