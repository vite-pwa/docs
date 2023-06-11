import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'

// move the following types to vite-plugin-pwa
type ClientMode = 'auto' | 'focus-existing' | 'navigate-existing' | 'navigate-new'
interface CustomPWAManifest extends ManifestOptions {
  // https://github.com/WICG/pwa-url-handler/blob/main/handle_links/explainer.md#handle_links-manifest-member
  handle_links?: 'auto' | 'preferred' | 'not-preferred'
  // https://developer.mozilla.org/en-US/docs/Web/Manifest/launch_handler#launch_handler_item_values
  launch_handler?: {
    client_mode: ClientMode | ClientMode[]
  }
  edge_side_panel?: {
    preferred_width?: number
  }
}
interface CustomPWAOptions extends Partial<VitePWAOptions> {
  manifest?: Partial<CustomPWAManifest> | false
}

export const pwa: Partial<CustomPWAOptions> = {
  outDir: '.vitepress/dist',
  registerType: 'prompt',
  includeManifestIcons: false,
  manifest: {
    id: '/',
    name: 'Vite Plugin PWA',
    short_name: 'PWA for Vite',
    description: 'Zero-config PWA for Vite and the ecosystem',
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
      label: 'Screenshot of Zero-config PWA Framework-agnostic Plugin for Vite and Integrations',
    }],
    handle_links: 'preferred',
    launch_handler: {
      client_mode: 'focus-existing',
    },
    edge_side_panel: {},
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'jsdelivr-images-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}
