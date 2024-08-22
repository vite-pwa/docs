import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

import { transformHead } from './scripts/transformHead'
import { pwa } from './scripts/pwa'
import { en } from './config/en'
import { zh } from './config/zh'

const ogUrl = 'https://vite-pwa-org.netlify.app/'
const ogImage = `${ogUrl}og-image.png`

export default withPwa(defineConfig({
  title: 'Vite PWA',
  description: 'Zero-config PWA Framework-agnostic for Vite and Integrations',
  rewrites: {
    'en/:rest*': ':rest*',
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', {
      name: 'keywords',
      content: 'PWA, React, Vue, VitePress, Preact, Svelte, SvelteKit, workbox, SolidJS, Vite, vite-plugin, íles, Astro, Nuxt 3, Nuxt module, Remix',
    }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vite Plugin PWA' }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:description', content: 'Zero-config PWA Framework-agnostic Plugin for Vite and Integrations' }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { name: 'twitter:description', content: 'Zero-config PWA Framework-agnostic Plugin for Vite and Integrations' }],
    ['meta', { name: 'twitter:title', content: 'Vite PWA' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
  ],
  srcExclude: ['README.md', 'CONTRIBUTING.md'],
  lastUpdated: true,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    // logo: '/favicon.svg',
    search: {
      provider: 'local',
      /*
      provider: 'algolia',
      options: {
        appId: 'TTO9T0AE3F',
        apiKey: '71bd3d3c7274205843267bb1ccb6b1a8',
        indexName: 'vite-plugin-pwa',
      },
       */
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/uccDuWkScq' },
      { icon: 'github', link: 'https://github.com/vite-pwa/vite-plugin-pwa' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-PRESENT Anthony Fu',
    },
  },
  vite: {
    logLevel: 'info',
  },
  pwa,
  transformHead,
  locales: {
    root: { label: 'English', ...en },
    zh: { label: '简体中文', ...zh },
  },
}))
