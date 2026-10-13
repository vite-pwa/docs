import type { VitePWAStrategy } from '@unplugin-pwa/core'
import type { SWType } from '@vite-pwa/workbox-build/types'
import type { PwaOptions } from '../with-pwa/types.ts'

function definePwaConfig<
  UserStrategy extends VitePWAStrategy,
  T extends SWType,
>(
  config: Partial<PwaOptions<UserStrategy, T>>,
): Partial<PwaOptions<UserStrategy, T>> {
  return config
}

export const pwa = definePwaConfig({
  outDir: '.vitepress/dist',
  registerType: 'prompt',
  includeManifestIcons: false,
  includeManifestShortcutIcons: false,
  includeManifestScreenshots: false,
  swType: 'classic-and-module',
  strategies: 'build-sw',
  manifest: {
    id: '/',
    name: 'PWA Ecosystem',
    short_name: 'PWA Ecosystem',
    description: 'Modular PWA integrations for modern web frameworks. Zero-config, extensible, and framework-agnostic bundler support for Vite, Webpack, and more',
    theme_color: '#ffffff',
    start_url: '/',
    lang: 'en-US',
    dir: 'ltr',
    orientation: 'natural',
    display: 'standalone',
    display_override: ['window-controls-overlay'],
    categories: ['development', 'developer tools'],
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [{
      src: 'og-image.png',
      sizes: '1200x630',
      type: 'image/png',
      label: 'Screenshot of PWA Ecosystem',
    }],
    shortcuts: [{
      name: 'Getting Started',
      description: 'Concepts and useful links for PWA (Progressive web applications): PWA made easy',
      url: '/guide/',
      icons: [{
        src: 'shortcuts/guide.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'Assets Generator',
      description: 'Generate all the PWA assets from a single command and a single source image',
      url: '/assets-generator/',
      icons: [{
        src: 'shortcuts/assets.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'Frameworks',
      description: 'All modern frameworks are supported: VanillaJS, TypeScript, Vue, React, Preact, Svelte, Solid, Web Components',
      url: '/frameworks/',
      icons: [{
        src: 'shortcuts/frameworks.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'Deploy',
      description: 'Hints about how to deploy your PWA',
      url: '/deployment/',
      icons: [{
        src: 'shortcuts/deploy.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }, {
      name: 'Vite PWA Workbox',
      description: 'Production-ready service worker libraries and tooling.',
      url: '/vite-pwa-workbox/',
      icons: [{
        src: 'shortcuts/workbox.png',
        sizes: '96x96',
        type: 'image/png',
      }],
    }],
    handle_links: 'preferred',
    launch_handler: {
      client_mode: ['navigate-existing', 'auto'],
    },
    edge_side_panel: {
      preferred_width: 480,
    },
  },
  minify: false,
  buildSW: {
    inlineWorkboxRuntime: false,
    workboxRuntimeCompatible: false,
    swSrc: '.vitepress/pwa-ecosystem-sw.ts',
    globPatterns: [
      '**/*.{css,js,html,svg,png,webp,ico,txt,woff2,json,excalidraw}',
    ],
    globIgnores: [
      'shortcuts/*.svg',
      'unplugin-pwa/api/symbols/**',
      'unplugin-pwa/api/packages/**',
      'assets/unplugin-pwa_api_packages_*',
      'assets/unplugin-pwa_api_symbols_*',
      'vite-pwa-workbox/api/packages/**',
      'vite-pwa-workbox/api/symbols/**',
      'assets/vite-pwa-workbox_api_packages_*',
      'assets/vite-pwa-workbox_api_symbols_*',
    ],
  },
})
